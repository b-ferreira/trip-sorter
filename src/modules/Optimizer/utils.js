import Diqueue from 'diqueue';
import { groupBy, isEmpty, isNil, pipe, prop, sort } from 'ramda';
import { AVAILABLE_SORTING_STRATEGIES } from 'modules/Optimizer/constants';

const groupByDeparture = groupBy(prop('departure'));
const groupByArrival = groupBy(prop('arrival'));
const groupByDeal = groupBy(prop('reference'));
const computeBestDealWeight = ({ calc, sorter }) =>
  pipe(
    sort(sorter),
    prop(0),
    deal => ({
      weight: calc(deal),
      reference: deal['reference']
    })
  );

const initializeGraph = (dataset, sortStrategy) => {
  if (isNil(dataset) || isEmpty(dataset)) {
    return [];
  }

  const departures = groupByDeparture(dataset);
  return Object.keys(departures).reduce((graph, departure) => {
    graph[departure] = [];

    const currentDepartureArrivals = groupByArrival(departures[departure]);
    Object.keys(currentDepartureArrivals).forEach(arrival => {
      graph[departure][arrival] = computeBestDealWeight(sortStrategy)(currentDepartureArrivals[arrival]);
    });

    return graph;
  }, []);
};

const runDijkstraAlgorithm = (graph, startVertex, targetVertex) => {
  const distances = [];
  const previousVertices = [];
  const visitedVertices = [];
  const queue = new Diqueue(null, (a, b) => a.weight > b.weight ? a : b, 'city');

  for (const city in graph) {
    distances[city] = Infinity;
    previousVertices[city] = null;
  }
  distances[startVertex] = 0;
  queue.push({ city: startVertex, weight: distances[startVertex] });

  while(!queue.isEmpty) {
    const currentVertex = queue.pop();

    if (currentVertex.city === targetVertex) {
      break;
    }

    for (const neighbor in graph[currentVertex.city]) {
      if (!visitedVertices[neighbor]) {
        const edge = graph[currentVertex.city][neighbor];
        const currentNeighborDistance = distances[neighbor];
        const distanceFromVertexToNeighbor = distances[currentVertex.city] + edge.weight;

        if (distanceFromVertexToNeighbor < currentNeighborDistance) {
          distances[neighbor] = distanceFromVertexToNeighbor;
          previousVertices[neighbor] = {
            city: currentVertex.city,
            weight: distances[neighbor],
            reference: edge.reference
          };
        }

        queue.update(neighbor, {
          city: neighbor,
          weight: distances[neighbor],
          reference: edge.reference
        });
      }
    }

    visitedVertices[currentVertex.city] = currentVertex;
  }

  return {
    distances,
    previousVertices
  };
};

const traverseShortestPath = ({ previousVertices }, references, destination) => {
  let currentCity = destination;
  let shortestPath = [];
  while (currentCity) {
    const cityVertex = previousVertices[currentCity];
    if (cityVertex) {
      shortestPath.push(references[cityVertex.reference][0]);
    }
    currentCity = (cityVertex || {}).city;
  }

  return shortestPath.reverse();
};

export const findOptimimalPath = (dataset, from, to, sortStrategy = AVAILABLE_SORTING_STRATEGIES.cheapest) => {
  return new Promise((resolve, reject) => {
    try {
      const graph = initializeGraph(dataset, sortStrategy);
      if (!isEmpty(graph)) {
        const graphResults = runDijkstraAlgorithm(graph, from, to);
        resolve(traverseShortestPath(graphResults, groupByDeal(dataset), to));
      }

      resolve([]);
    } catch(e) {
      reject(e);
    }
  });
};

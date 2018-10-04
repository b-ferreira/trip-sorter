import classNames from 'classnames';
import { is, isEmpty } from 'ramda';

const isFalsy = value => !value || isEmpty(value);

/**
 * Builds a className value using the BEM standards.
 *
 * @param {String} block - A BEM block
 * @param {String} element - A BEM element
 * @param {String[]} modifiers - A list of BEM modifiers
 * @returns {String} ClassName value
 */
const buildClassName = (block, element, modifiers = []) => {
  const elementName = isFalsy(element) ? block : `${block}__${element}`;
  const modifierClasses = modifiers.map(
    modifier => !isFalsy(modifier) && `${elementName}--${modifier}`
  );

  return classNames(elementName, ...modifierClasses);
};

/**
 * Builds a className value using the BEM standards.
 *
 * @param {String} block - A BEM block
 * @param {String} element - A BEM element
 * @param {String[]} modifiers - A list of BEM modifiers
 * @returns {Object} A className builder: an object that responds to #element(), #modifier() calls and builds a className when #toString is called
 *
 * @example <caption>Basic usage</caption>
 * // all lines return 'block__element block__element--cool'
 * bem('block').element('element').modifier('cool').toString();
 * bem('block', 'element', 'cool').toString();
 * bem('block').element('element').modifier('cool', null, false).toString(); // Falsy modifiers are ignored
 * bem('block').modifier('cool').element('cool').toString(); // You can invert the calls
 *
 * @example <caption>Using in a Component</caption>
 * const Button = ({ small, disabled, icon, label }) => {
 *   const className = bem('button');
 *   const iconClassName = className.element('icon');
 *
 *   return (
 *     <button className={className.modifier(small && 'small').modifier(disabled && 'disabled')}>
 *       <image className={iconClassName.modifier(small && 'small-icon')} src={icon} />
 *
 *       <span className={className.modifier(disabled && 'disabled').element('label')}>
 *         {label}
 *       </span>
 *     </button>
 *   )
 * }
 */
export const bem = (block, element, modifiers = []) => {
  const modifierList = is(String, modifiers) ? [modifiers] : modifiers;

  return {
    element: name => bem(block, name, modifierList),
    modifier: (...names) => bem(block, element, [...modifierList, ...names]),
    toString: () => buildClassName(block, element, modifierList)
  };
};

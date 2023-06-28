import { Fragment, FC } from 'react';
import cx from 'classnames';
import { Menu } from '@mantine/core';
import { VscCircleFilled } from '@react-icons/all-files/vsc/VscCircleFilled';
import { IDropdownMenu } from './interfaces/DropdownMenu.interfaces';

enum EDefaultStyles {
  dropdown = 'border border-app-border bg-popover-background rounded-none px-0 ',
  label = 'text-activityBar-foreground-inactive font-default px-5 pt-3 pb-1 font-medium text-xs leading-3 ',
  item = 'cursor-pointer text-app-foreground !rounded-none hover:bg-focus1 focus-visible:!shadow-none font-default px-5 py-0 text-base leading-7',
  divider = 'bg-app-border',
  disabled = 'opacity-50 cursor-default',
  disabledItem = '!text-activityBar-foreground-inactive !cursor-default',
}

const DropdownMenu: FC<IDropdownMenu> = ({
  id = '',
  selected = '',
  width = 200,
  options = [],
  handleRenderer,
  classNames = {},
  onSelect = () => {},
  onOpenChange = () => {},
  disabled = false,
  menuProps = {},
}) => {
  return (
    <Menu
      id={id}
      shadow="md"
      width={width}
      classNames={classNames}
      onChange={onOpenChange}
      disabled={disabled}
      {...menuProps}
    >
      <Menu.Target>
        <span
          className={cx(
            { 'inline-block': !classNames.trigger },
            { block: classNames.trigger },
            { [EDefaultStyles.disabled]: disabled },
            classNames.trigger
          )}
        >
          {handleRenderer()}
        </span>
      </Menu.Target>

      <Menu.Dropdown
        className={cx(EDefaultStyles.dropdown, {
          'd-none border-0': options.length === 0,
        })}
      >
        {options.map((item, i) => {
          return (
            <Fragment key={`menu-item-${i}`}>
              {item.isLabel ? (
                <Menu.Label className={EDefaultStyles.label}>
                  {item.name}
                  {typeof item.postfix === 'function' && item.postfix()}
                </Menu.Label>
              ) : (
                <Menu.Item
                  className={cx(
                    EDefaultStyles.item,
                    {
                      'font-bold': selected === item.name,
                    },
                    {
                      [EDefaultStyles.disabledItem]: item.disabled,
                    }
                  )}
                  title={item.title}
                  icon={typeof item.prefix === 'function' && item.prefix()}
                  rightSection={
                    <>
                      {item?.dotIndicator === true && (
                        <span>
                          <VscCircleFilled
                            size={12}
                            className="text-primaryColor"
                          />
                        </span>
                      )}
                      {typeof item.postfix === 'function' && item.postfix()}
                    </>
                  }
                  onClick={() => !item.disabled && onSelect(item)}
                >
                  {item.name}
                </Menu.Item>
              )}

              {item.showSeparator ? (
                <Menu.Divider
                  key={`menu-divider-${i}`}
                  className={EDefaultStyles.divider}
                />
              ) : (
                <></>
              )}
            </Fragment>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

export default DropdownMenu;

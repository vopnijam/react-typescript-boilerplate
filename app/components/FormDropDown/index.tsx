import * as React from 'react';
import styled from 'styled-components';

import { HorizontalLineSeparator } from 'components/HorizontalLineSeparator';
import { Icon } from 'components/Icon';

const DropdownContainerOuter = styled.div`
  width: 100%;
  margin: 2px 0;
  display: flex;
  flex-direction: column;

  ${({ isDisabled }: {isDisabled: boolean}) => isDisabled ? `
    cursor: not-allowed;
    opacity: 0.6;
    user-select: none;
  ` :  '' }
`;

export const Row = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DropdownContainerInner = styled.div`
  width: 100%;
  height: 39px;
  box-sizing: border-box;
  transition: border .5s ease-in-out;
  transition: border-color .5s ease-in-out;
  transition: opacity .5s ease-in-out;
  outline: none;

  ${({ isBorderless, theme }: {isBorderless: boolean; theme: ITheme}) => (
    isBorderless ? 'border: none;' : `border: 1px solid ${theme.colors.grey[0]};`
  )}

  cursor: pointer;
  display: flex;
  border-radius: 3px;

  :hover {
    border: 1px solid ${({ theme }: {theme: ITheme}) => theme.colors.yellow[0]};
    opacity: 1;
  };

  :focus {
    border: 1px solid ${({ theme }: {theme: ITheme}) => theme.colors.grey[0]};
    opacity: 1;
    color: ${({ theme }: {theme: ITheme}) => theme.colors.black};
  };
`;

export const DropDownLabel = styled.div`
  position: relative;
  font-size: 0.8em;
  margin: 0 0 0 0.1em;

  ${({ isRequired, theme }: {isRequired: boolean; theme: ITheme}) => isRequired ? `
    &:after {
      content: ' *';
      color: ${theme.colors.red[0]};
    }
  ` :  ''}
`;

const LegendColor = styled.div<{fill: string}>`
  padding: 8px;
  border-radius: 2px;
  background-color: ${({ fill }: { fill: string }) => fill};
  margin-right: 12px;
`;

const PaddedRow = styled(Row)`
  padding: 0 12px;
`;

const Dropdown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 99;
  background-color: ${({ theme }: {theme: ITheme}) => theme.colors.white};
  min-width: 274px;
  max-height: 150px;
  border: 1px solid ${({ theme }: {theme: ITheme}) => theme.colors.grey[0]};
  border-radius: 3px;
  padding: 5px 12px;
  overflow: auto;
`;

const DropDownItemContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
`;

const DropDownItem = styled.div`
  cursor: pointer;
`;

const NoMarginHorizontalLineSeparator = styled(HorizontalLineSeparator)`
  margin: 0;
`;
const DisappearingContainer = styled.div`
  display: inline-block;
  position: relative;
`;

export class FormDropDown extends React.PureComponent<IFormDropDownProps> {
  private triggerRef?: HTMLDivElement;
  private menuRef?: HTMLDivElement;

  public readonly state: IFormDropDownState = {
    isMenuOpen: false,
    selectedItem: this.props.dropDownItems[0],
  };

  private readonly setMenuRef = (node: HTMLDivElement) => {
    this.menuRef = node;
  }

  private readonly setTriggerRef = (node: HTMLDivElement) => {
    this.triggerRef = node;
  }

  private readonly handleCheckForOutsideClick = (event: MouseEvent) => {
    if (this.triggerRef?.contains(event.target as Node | null) && this.state.isMenuOpen) {
      this.handleSetIsMenuOpen(false);
    } else if (this.triggerRef?.contains(event.target as Node | null) && !this.state.isMenuOpen) {
      this.handleSetIsMenuOpen(true);
    } else if (!this.menuRef?.contains(event.target as Node | null)) {
      this.handleSetIsMenuOpen(false);
    }
  }

  private readonly handleSetIsMenuOpen = (isMenuOpen: boolean) => {
    if (this.state.isMenuOpen !== isMenuOpen) {
      this.setState((prevState) => ({
        ...prevState,
        isMenuOpen,
      }));
    }
  }

  private readonly handleSelectItem = (item: IDropDownItem) => {
    this.setState((prevState) => ({
      ...prevState,
      isMenuOpen: false,
      selectedItem: item,
    }));
  }

  public componentDidMount = () => {
    document.addEventListener('mousedown', this.handleCheckForOutsideClick);
  }

  public componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleCheckForOutsideClick);
  }

  public render = () => (
    <DropdownContainerOuter isDisabled={this.props.isDisabled} className={this.props.className}>
      {this.props.label && (
        <DropDownLabel isRequired={this.props.isRequired || false}>
        {this.props.label}
        </DropDownLabel>
      )}
      <>
        <DropdownContainerInner
          ref={this.setTriggerRef}
          isBorderless={this.props.isBorderless || false}
        >
          <PaddedRow>
            {this.state.selectedItem.fill ? <LegendColor fill={this.state.selectedItem.fill}/> :
              (this.state.selectedItem.path && <Icon path={this.state.selectedItem.path}/>)}
            {this.state.selectedItem.value}
          </PaddedRow>
        </DropdownContainerInner>
        <DisappearingContainer>
          {this.state.isMenuOpen && (
            <Dropdown ref={this.setMenuRef}>
              {this.props.dropDownItems.map((item: IDropDownItem, index: number) => (
                <DropDownItem
                  key={item.key}
                >
                  <DropDownItemContent
                    key={item.key}
                    onClick={() => {
                      this.props.onChange(item.value);
                      this.handleSelectItem(item);
                    }}
                  >
                    {item.fill ? <LegendColor fill={item.fill}/> : (
                      item.path && <Icon path={item.path}/>
                    )}
                    {item.value}
                  </DropDownItemContent>
                  {index < this.props.dropDownItems.length - 1 &&
                    <NoMarginHorizontalLineSeparator/>}
                </DropDownItem>
              ))}
            </Dropdown>
          )}
        </DisappearingContainer>
      </>
    </DropdownContainerOuter>
  )
}

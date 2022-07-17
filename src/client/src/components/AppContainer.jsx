import React, { useEffect, useCallback } from "react";

import ListControlsConnector from "./ListControlsConnector";

import { Button, Toast } from "monday-ui-react-core";

import Search from "./Search";

import ListConnector from "./ListConnector";
import FilterConnector from "./FilterConnector";

const AppContainer = ({
  showLoaderAction,
  hideLoaderAction,
  showLoader,
  showClearButtonAction,
  hideClearButtonAction,
  showClearButton,
  showToastAction,
  hideToastAction,
  showToast,
  crateItemAction,
  getItemsAction,
  clearAllItemsAction,
  toastContent,
  toastOrientation,
}) => {
  useEffect(() => {
    getItemsAction();
  }, [getItemsAction]);

  const onCloseCallback = useCallback(() => {
    hideToastAction();
  }, [hideToastAction]);

  return (
    <div className="app-container">
      <div className="upper-div">
        <Search />
        <FilterConnector />
      </div>

      <div className="list-container-background">
        <div className="app-name">Ori's List</div>

        <ListControlsConnector />

        <div className="list-container">
          <ListConnector />
        </div>

        <div className="clear-all-button-div">
          {showClearButton ? (
            <Button
              onClick={clearAllItemsAction}
              id="clear-all-button"
              className={`clear-all-button `}
            >
              Clear All
            </Button>
          ) : null}
          <Toast
            open={showToast}
            type={toastOrientation}
            onClose={() => onCloseCallback()}
            autoHideDuration={4000}
            className="monday-storybook-toast_box"
          >
            {toastContent}
          </Toast>
        </div>
      </div>
    </div>
  );
};
export default AppContainer;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "./index";



const RouteProvider = (props) => {
    const [initialRoute, setInitialRoute] = useState();

    return (
        <Context.Provider
            value={{
              ...props,
              initialRoute,
              setInitialRoute: setInitialRoute
            }}
        >
          {props.children}
        </Context.Provider>
      );
}

export default RouteProvider;

  
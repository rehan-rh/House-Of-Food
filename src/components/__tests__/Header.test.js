import { render } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import store from "../../utils/store";
import { StaticRouter } from "react-router-dom/server";



test("logo should load in rendering header", () => {
    //load header
    const header = render(
      <StaticRouter>
         <Provider store={store}>{/*here we used provider bcaz we used redux in header */}
          <Header />
        </Provider>
      </StaticRouter>
    );
    console.log(header);
  
    const logo = header.getByTestId("logo");
    console.log(logo);
    expect(logo.src).toBe("http://localhost/dummy.png");
  
  });

  test("cart should have 0 items ", () => {
    //load header
    const header = render(
      <StaticRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </StaticRouter>
    );
    console.log(header);
  
    const cart = header.getByTestId("cart");
    expect(cart.innerHTML).toBe("Carts-0");
  
  });
  
  
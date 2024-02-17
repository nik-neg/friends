import { appBarOptions } from "./consts.ts";
import { SAppBar, SAppBarButtonWrapper } from "./AppBar.styles.ts";
import { Button } from "../common/Button/Button.tsx";

export const AppBar = () => {
  return (
    <SAppBar>
      {appBarOptions.map((option, index) => {
        return (
          <SAppBarButtonWrapper key={index}>
            <Button name={option} key={index} />;
          </SAppBarButtonWrapper>
        );
      })}
    </SAppBar>
  );
};

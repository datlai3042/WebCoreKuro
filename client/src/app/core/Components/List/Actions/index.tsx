import { Fragment, useMemo } from "react";
import { TActionsProps } from "./actions.component.type";

const Actions = (props: TActionsProps) => {
  const { actions, countRender, keyActive } = props;

  const renderActions = useMemo(() => {
    return (
      <>
        {Array(countRender)
          .fill(0)
          .map((action, index) => (
            <Fragment key={index}>{actions[index]}</Fragment>
          ))}
      </>
    );
  }, [actions, countRender]);

  return <>{renderActions}</>;
};

export default Actions;

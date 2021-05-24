import * as React from "react";

export interface IItemProps {
  name: string;
}

export default function Item(props: IItemProps) {
  return <>{props.name}</>;
}

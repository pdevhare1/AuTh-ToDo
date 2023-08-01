import { Notify } from "quasar";

export default function () {
  Notify.setDefaults({
    position: "middle",
    timeout: 2500,
    textColor: "white",
    actions: [
      {
        icon: "close",
        color: "white",
      },
    ],
  });
}

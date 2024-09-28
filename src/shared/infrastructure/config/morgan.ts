import { createColors, bold } from "colorette";
import morgan from "morgan";

const colors = createColors();

export const morganConfig = morgan(function (tokens: any, req, res) {
  const status = res.headersSent ? res.statusCode : 100;

  let colorStatus;
  let colorMethood;
  let colorResponseTime;

  if (status) {
    colorStatus =
      status >= 500
        ? colors.red
        : status >= 400
          ? colors.yellow
          : status >= 300
            ? colors.cyan
            : status >= 200
              ? colors.green
              : status >= 100
                ? colors.magenta
                : colors.white;

    colorMethood =
      tokens.method(req, res) === "GET"
        ? colors.green
        : tokens.method(req, res) === "POST"
          ? colors.blue
          : tokens.method(req, res) === "PUT"
            ? colors.yellow
            : tokens.method(req, res) === "DELETE"
              ? colors.red
              : tokens.method(req, res) === "PATCH"
                ? colors.magenta
                : tokens.method(req, res) === "OPTIONS"
                  ? colors.cyan
                  : colors.white;

    colorResponseTime =
      parseFloat(tokens["response-time"](req, res)) >= 5
        ? colors.red
        : parseFloat(tokens["response-time"](req, res)) >= 3
          ? colors.yellow
          : parseFloat(tokens["response-time"](req, res)) >= 1
            ? colors.green
            : colors.green;
  } else {
    // Color predeterminado si no hay código de estado
    colorStatus = colors.white;
    colorMethood = colors.white;
    colorResponseTime = colors.white;
  }

  // Aplicar colores a los valores de texto antes de concatenarlos
  const formattedLine = [
    colorStatus(bold("📯 [" + status + "] >")),
    colorMethood(bold(tokens.method(req, res))),
    colorResponseTime(bold(tokens["response-time"](req, res) + " ms")),
    colors.white(bold(tokens.url(req, res))),
  ].join(" ");

  return formattedLine;
});

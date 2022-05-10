import axios from "axios";
import * as chart from "asciichart";
import { DataResponse } from "./types";

const BASE_URL = "https://blob-prod-president.abs-cbn.com";
const PRES_JSON = "president-00199000-nation-location-1.json";

function withComma(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const main = async () => {
  const ratios = [];
  console.clear();
  console.log(
    "TIME".padEnd(13),
    "MARCOS".padEnd(13),
    "ROBREDO".padEnd(13),
    "|",
    "RATIO".padEnd(13),
    "DIFF".padEnd(13)
  );
  console.log("-".repeat(13 * 5 + 3));
  for (let i = 0; i < 100; i++) {
    const url = `${BASE_URL}/feed-${i + 1}/${PRES_JSON}`;
    try {
      const { data } = await axios.get<DataResponse>(url);
      // const candidateLength = data.result.length;
      // for (let j = 0; j < candidateLength; j++) {
      // const candidate = data.result[j];
      // console.log(`${candidate.voteCount} - ${candidate.candidateName}`);
      // }

      const robredo = data.result.find(
        (e) => e.lastName.toLowerCase() == "robredo"
      );
      const marcos = data.result.find(
        (e) => e.lastName.toLowerCase() == "marcos"
      );

      if (!robredo) {
        console.log("Robredo not found");
        break;
      }
      if (!marcos) {
        console.log("Marcos not found");
        break;
      }

      const date = new Date(data.timestamp);
      const ratio = robredo.voteCount / marcos.voteCount;

      const M = `${withComma(marcos.voteCount)}`.padEnd(13);
      const R = `${withComma(robredo.voteCount)}`.padEnd(13);
      const T = `${date.toLocaleTimeString()}`.padEnd(13);
      const diff = `${withComma(marcos.voteCount - robredo.voteCount)}`.padEnd(
        13
      );
      const ratioText = `${ratio.toFixed(5)}`.padEnd(13);

      console.log(`${T} ${M} ${R} | ${ratioText} ${diff}`);
      ratios.push(ratio);
    } catch (e) {
      console.warn(`Error fetching ${url}`);
      break;
    }
  }

  console.log(`\nRATIO CHART:`);
  console.log(
    chart.plot(ratios, {
      min: Math.min(...ratios) - 0.02,
      max: Math.max(...ratios) + 0.02,
      height: 20,
    })
  );
};

main().catch(console.error);

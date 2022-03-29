import createApolloMock from "generated/createApolloMock";
import { GetAllArticlesDocument } from "generated/graphql";
import moment from "moment-timezone";
import { MOCK_DATE } from "./mockDate";

const momentMock = moment(MOCK_DATE);

export const useGetAllArticlesQueryMock = () => createApolloMock(
    GetAllArticlesDocument,
    {},
    {
      data: {
        allArticles: [
          {
            title: "MicroStrategy to Sell $1B Worth of Stock to Buy Bitcoin",
            url: "http://google.com",
            text: "card1",
            sourceName: "",
            tickers: ["BTC", "ETH", "USDC"],
            topics: [],
            imageUrl: "",
            createdOn: {
              date: momentMock.subtract(30, "seconds").toDate(),
            },
          },
          {
            title: "MicroStrategy to Sell $1B Worth of Stock to Buy Bitcoin 1",
            url: "http://google.com",
            text: "card2",
            sourceName: "",
            tickers: ["BTC", "ETH", "USDC"],
            topics: [],
            imageUrl: "",
            createdOn: {
              date: momentMock.subtract(1, "hour").toDate(),
            },
          },
          {
            title: "MicroStrategy to Sell $1B Worth of Stock to Buy Bitcoin 2",
            url: "http://google.com",
            text: "card3",
            sourceName: "",
            tickers: ["BTC", "ETH", "USDC"],
            topics: [],
            imageUrl: "",
            createdOn: {
              date: momentMock.subtract(1, "month").toDate(),
            },
          },
          {
            title: "MicroStrategy to Sell $1B Worth of Stock to Buy Bitcoin 3",
            url: "http://google.com",
            text: "card4",
            sourceName: "",
            tickers: ["BTC", "ETH", "USDC"],
            topics: [],
            imageUrl: "",
            createdOn: {
              date: momentMock.subtract(4, "months").toDate(),
            },
          },
        ],
      },
    },
    { addTypename: false }
  );

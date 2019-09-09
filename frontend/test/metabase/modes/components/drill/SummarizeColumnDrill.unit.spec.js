/* eslint-disable */

import SummarizeColumnDrill from "metabase/modes/components/drill/SummarizeColumnDrill";

import {
  question,
  clickedFloatHeader,
  ORDERS,
} from "__support__/sample_dataset_fixture";

describe("SummarizeColumnDrill", () => {
  it("should not be valid for top level actions", () => {
    expect(SummarizeColumnDrill({ question })).toHaveLength(0);
  });
  it("should be valid for click on numeric column header", () => {
    const actions = SummarizeColumnDrill({
      question,
      clicked: clickedFloatHeader,
    });
    expect(actions.length).toEqual(5);
    let newCard = actions[0].question().card();
    expect(newCard.dataset_query.query).toEqual({
      "source-table": ORDERS.id,
      aggregation: [["sum", ["field-id", ORDERS.TOTAL.id]]],
    });
    expect(newCard.display).toEqual("scalar");
  });
});

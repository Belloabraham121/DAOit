import { getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { ethereum } from "thirdweb/chains";
import { client, DAOIT } from "../lib/constants";

const daoitcontract = getContract({
  address: DAOIT,
  chain: ethereum,
  client,
});

  const {
    data: proposals,
    isLoading: proposalLoading,
    error: proposalError,
  } = useSendTransaction({
    contract: daoitcontract,
    method:
      "function createProposal(string memory _description)",
    params: [description],
  });

  return {
     proposals,
     proposalLoading,
     proposalError,
};





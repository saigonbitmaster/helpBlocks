import { TranslationMessages } from "react-admin";
import englishMessages from "ra-language-english";

const customEnglishMessages: TranslationMessages = {
  ...englishMessages,
  pos: {
    search: "Search",
    configuration: "Configuration",
    language: "Language",
    theme: {
      name: "Theme",
      light: "Light",
      dark: "Dark",
    },
    dashboard: {
      seeAllCases: "See all posted cases",
      postedJob: "Posted jobs",
      submittedUsers: "Submitted users",
      allUsers: "See all users",
      allPostedJobs: "See all Jobs",
      allPostedCases: "See all Cases",
      plutusTxs: "Plutus TXs",
      postedCases: "Posted Cases",
      allPlutusTxs: "See all plutus TXs",
      voteData: "Vote data",
      welcome: {
        title: "Welcome to Heart Blocks",
        subtitle: "subtitle.",
        ra_button: "Heart Blocks site",
        demo_button: "Source for this demo",
      },
    },
    menu: {
      smartContracts: "Smart contracts",
      reports: "Reports",
      manageFund: "Plutus calls",
      tools: "Tools",
      settings: "Settings",
      cases: "Cases",
      votes: "Votes",
    },
  },

  resources: {
    caseVotes: {
      name: "Case votes",
    },
    unlockVotes: {
      name: "Unlock votes",
    },
    caseList: {
      name: "Case list|||| Case list",
    },
    cases: {
      name: "Post a case |||| Post a case",
    },
    caseReports: {
      name: "Case reports",
    },
    voteReports: {
      name: "Vote reports",
    },
    plutustxs: {
      name: "Plutus TXs",
    },
    jobQueues: {
      name: "Queue jobs",
    },
    changePassword: {
      name: "Change password",
    },
    verifySmartContract: {
      name: "Verify a script",
    },

    paymentReport: {
      name: "Plutus API calls",
    },
    reports: {
      import: "Import excels",
    },

    cardanos: {
      name: "Fetch cardano |||| Fetch cardano",
    },
    parseAddress: {
      name: "Parse address",
    },
    gits: {
      reportName: "Git commits",
      name: "Query github |||| Query github",
    },

    smartContracts: {
      name: "Contract list|||| Contract list",
    },
    contracts: {
      name: "Publish a contract |||| Publish a contract",
    },

    wallets: {
      name: "Select wallet |||| Select wallet",
    },
    withdraws: {
      name: "Withdraw |||| Withdraws",
    },
    postJobReports: {
      name: "Smart contract |||| Smart contracts",
    },
    walletReports: {
      name: "Wallet UTXO |||| Wallet UTXOs",
    },
    smartContractReports: {
      name: "Smart contract |||| Smart contracts",
    },
    settings: {
      name: "Setting |||| Settings",
      action: {
        accept: "Accept",
        reject: "Reject",
      },
    },
  },
};

export default customEnglishMessages;

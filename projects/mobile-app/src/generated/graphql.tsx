import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AccountType = {
  __typename?: 'AccountType';
  accountToken?: Maybe<Scalars['String']>;
  averageRating?: Maybe<Scalars['Float']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<CountryType>;
  creationMethod?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  hasMerchantAccount?: Maybe<Scalars['Boolean']>;
  hasMultipleAccounts?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  image: Scalars['String'];
  isMerchant?: Maybe<Scalars['Boolean']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  kycNeeded?: Maybe<Scalars['Boolean']>;
  kycStatus?: Maybe<PlatformMembershipType>;
  merchantProfileDetails?: Maybe<MerchantProfileType>;
  phone?: Maybe<Scalars['String']>;
  qr?: Maybe<QrType>;
  recentlyTransactedWith?: Maybe<Array<Maybe<AccountType>>>;
  region?: Maybe<Scalars['String']>;
  reviews?: Maybe<ReviewResultsType>;
  transactions?: Maybe<TransactionResultsType>;
  type?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
};


export type AccountTypeRecentlyTransactedWithArgs = {
  limit?: Maybe<Scalars['Float']>;
};

export type AddressInput = {
  additional?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  postal?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type AddressType = {
  __typename?: 'AddressType';
  city?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  streetAdditional?: Maybe<Scalars['String']>;
};

export type AssetBalanceHistoryType = {
  __typename?: 'AssetBalanceHistoryType';
  end?: Maybe<Scalars['DateTime']>;
  firstValidPointIndex?: Maybe<Scalars['Float']>;
  history?: Maybe<Array<Maybe<AssetHistoryPointType>>>;
  maxPrice?: Maybe<Scalars['Float']>;
  minPrice?: Maybe<Scalars['Float']>;
  period?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  totalFiatBalance?: Maybe<Scalars['Float']>;
};

export type AssetBalanceType = {
  __typename?: 'AssetBalanceType';
  amount?: Maybe<Scalars['Float']>;
  code?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  /** This value will be a divisor for conversion to the user's local currency, which is the same currency used for display in the field: fiatAmount. */
  exchangeRate?: Maybe<Scalars['Float']>;
  fiatAmount?: Maybe<ValueDisplay>;
  interestGaining?: Maybe<Scalars['Boolean']>;
  logoImage?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AssetHistoryPointType = {
  __typename?: 'AssetHistoryPointType';
  price?: Maybe<Scalars['Float']>;
  time?: Maybe<Scalars['Float']>;
};

export type AssetHistoryType = {
  __typename?: 'AssetHistoryType';
  end?: Maybe<Scalars['DateTime']>;
  firstValidPointIndex?: Maybe<Scalars['Float']>;
  history?: Maybe<Array<Maybe<AssetHistoryPointType>>>;
  maxPrice?: Maybe<Scalars['Float']>;
  minPrice?: Maybe<Scalars['Float']>;
  period?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
};

export type AssetInterestGainedType = {
  __typename?: 'AssetInterestGainedType';
  code?: Maybe<Scalars['String']>;
  interestGained?: Maybe<Scalars['Float']>;
  interestGainedFiat?: Maybe<ValueDisplay>;
  logoImage?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AssetInterestRateType = {
  __typename?: 'AssetInterestRateType';
  code?: Maybe<Scalars['String']>;
  interestRate?: Maybe<Scalars['Float']>;
  logoImage?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AssetInterestSummaryType = {
  __typename?: 'AssetInterestSummaryType';
  assets?: Maybe<Array<Maybe<AssetInterestGainedType>>>;
  totalInterestGained?: Maybe<Scalars['Float']>;
  totalInterestGainedFiat?: Maybe<ValueDisplay>;
};

export type AssetMarketMetricList = {
  __typename?: 'AssetMarketMetricList';
  assets?: Maybe<Array<Maybe<AssetMetricType>>>;
  period?: Maybe<Scalars['String']>;
};

export type AssetMetricType = {
  __typename?: 'AssetMetricType';
  balanceHistory?: Maybe<AssetHistoryType>;
  code?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  history?: Maybe<AssetHistoryType>;
  logoImage?: Maybe<Scalars['String']>;
  marketCap?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  percentChangeOverPeriod?: Maybe<Scalars['Float']>;
  period?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};


export type AssetMetricTypeBalanceHistoryArgs = {
  period?: Maybe<MarketPeriodInput>;
};


export type AssetMetricTypeHistoryArgs = {
  period?: Maybe<MarketPeriodInput>;
};

export enum AssetTransactionCategory {
  Deposit = 'DEPOSIT',
  EtxTransferIn = 'ETX_TRANSFER_IN',
  EtxTransferOut = 'ETX_TRANSFER_OUT',
  Interest = 'INTEREST',
  Purchase = 'PURCHASE',
  Receipt = 'RECEIPT',
  Swap = 'SWAP'
}

export enum AssetTransactionStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processed = 'PROCESSED',
  RequiresAction = 'REQUIRES_ACTION'
}

export type AssetTransactionType = {
  __typename?: 'AssetTransactionType';
  amount?: Maybe<Scalars['Float']>;
  asset?: Maybe<Scalars['String']>;
  assetName?: Maybe<Scalars['String']>;
  category?: Maybe<AssetTransactionCategory>;
  coin?: Maybe<AssetType>;
  /** @deprecated use asset instead by 2/01/2022 */
  currency?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  fiatAmount?: Maybe<ValueDisplay>;
  fiatCurrency?: Maybe<Scalars['String']>;
  receiver?: Maybe<AccountType>;
  sender?: Maybe<AccountType>;
  status?: Maybe<AssetTransactionStatus>;
  swappedAsset?: Maybe<Scalars['String']>;
  swappedAssetName?: Maybe<Scalars['String']>;
};

export type AssetType = {
  __typename?: 'AssetType';
  code?: Maybe<Scalars['String']>;
  logoImage?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type BankType = {
  __typename?: 'BankType';
  account?: Maybe<AccountType>;
  accountHolder?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isValid?: Maybe<Scalars['Boolean']>;
  lastFour?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
};

export type BirthdayInput = {
  day?: Maybe<Scalars['Float']>;
  month?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

export type BlockType = {
  __typename?: 'BlockType';
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  sixMonth?: Maybe<Scalars['Float']>;
  threeMonth?: Maybe<Scalars['Float']>;
  twelveMonth?: Maybe<Scalars['Float']>;
};

export type BlocksType = {
  __typename?: 'BlocksType';
  blocks?: Maybe<Array<Maybe<BlockType>>>;
};

export type BusinessDetailType = {
  __typename?: 'BusinessDetailType';
  chargesEnabled?: Maybe<Scalars['Boolean']>;
  currentlyDueRequirements?: Maybe<Array<Maybe<Scalars['String']>>>;
  hasBanking?: Maybe<Scalars['Boolean']>;
  hasOnboarded?: Maybe<Scalars['Boolean']>;
  pastDueRequirements?: Maybe<Array<Maybe<Scalars['String']>>>;
  payoutsEnabled?: Maybe<Scalars['Boolean']>;
  pendingVerification?: Maybe<Scalars['Boolean']>;
  requirementsDueDate?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Scalars['String']>;
};

export type CardBrand = {
  __typename?: 'CardBrand';
  display?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type CarouselType = {
  __typename?: 'CarouselType';
  content: Scalars['String'];
  link: Scalars['String'];
  poster: Scalars['String'];
  src: Scalars['String'];
  type: Scalars['String'];
};

export type CoinBalance = {
  __typename?: 'CoinBalance';
  balance?: Maybe<Scalars['Float']>;
  interestGaining?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type CoinBalanceType = {
  __typename?: 'CoinBalanceType';
  availableBalances?: Maybe<Array<Maybe<CoinBalance>>>;
  totalBalances?: Maybe<Array<Maybe<CoinBalance>>>;
};

export type CommonResponse = {
  __typename?: 'CommonResponse';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Float']>;
};

export type ConfirmedQuoteType = {
  __typename?: 'ConfirmedQuoteType';
  destinationAmount?: Maybe<Scalars['Float']>;
  destinationCurrency?: Maybe<Scalars['String']>;
  destinationCurrencyCode?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  exchangeRate?: Maybe<Scalars['Float']>;
  fiatAmount?: Maybe<Scalars['Float']>;
  fiatCurrencyCode?: Maybe<Scalars['String']>;
  fiatFees?: Maybe<Scalars['Float']>;
  notes?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['Float']>;
  sourceCurrency?: Maybe<Scalars['String']>;
  sourceCurrencyCode?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
};

export type ContactInput = {
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  phoneNumbers?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ConversionResult = {
  __typename?: 'ConversionResult';
  destAmount?: Maybe<Scalars['Float']>;
  destCurrency?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['Float']>;
  sourceCurrency?: Maybe<Scalars['String']>;
};

export type CountryType = {
  __typename?: 'CountryType';
  alpha2?: Maybe<Scalars['String']>;
  currencyCode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CryptoAddressQrType = {
  __typename?: 'CryptoAddressQRType';
  code?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type CurrencyPortFolio = {
  __typename?: 'CurrencyPortFolio';
  amountPer?: Maybe<Scalars['Float']>;
  cryptoAmount?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  currencyName?: Maybe<Scalars['String']>;
  fiatAmount?: Maybe<Scalars['Float']>;
  fiatCurrency?: Maybe<Scalars['String']>;
  logoImage?: Maybe<Scalars['String']>;
};

export type DateOfCreation = {
  __typename?: 'DateOfCreation';
  date?: Maybe<Scalars['DateTime']>;
  timeSinceCreation?: Maybe<Scalars['String']>;
};


export type DeletedCardType = {
  __typename?: 'DeletedCardType';
  deletedCC?: Maybe<PaymentMethodType>;
  message?: Maybe<Scalars['String']>;
};

export type DepositAddresses = {
  __typename?: 'DepositAddresses';
  AVAX?: Maybe<Scalars['String']>;
  BTC?: Maybe<Scalars['String']>;
  ETH?: Maybe<Scalars['String']>;
  MATIC?: Maybe<Scalars['String']>;
  XLM?: Maybe<Scalars['String']>;
};

export type DistributedObjectData = {
  __typename?: 'DistributedObjectData';
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type DistributedObjectDataType = {
  __typename?: 'DistributedObjectDataType';
  amount?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type DistributionCurrency = {
  __typename?: 'DistributionCurrency';
  code?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  percentage?: Maybe<Scalars['Float']>;
};

export type EtxTransferQuote = {
  __typename?: 'ETXTransferQuote';
  transactionId?: Maybe<Scalars['String']>;
};

export type EtxDistribution = {
  __typename?: 'EtxDistribution';
  amount: Scalars['Float'];
  depositAddresses?: Maybe<DepositAddresses>;
  destinationAsset?: Maybe<Price>;
  distribution?: Maybe<Array<Maybe<DistributedObjectData>>>;
  product: Scalars['String'];
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrencyCode?: Maybe<Scalars['String']>;
  srcAmount?: Maybe<Scalars['String']>;
  srcCurrency?: Maybe<Scalars['String']>;
  uuid: Scalars['ID'];
};

export type EtxOrderDetail = {
  __typename?: 'EtxOrderDetail';
  distribution?: Maybe<Array<Maybe<OrderPercentageFields>>>;
  uuid?: Maybe<Scalars['String']>;
};

export type EtxPortfolio = {
  __typename?: 'EtxPortfolio';
  distribution?: Maybe<Array<Maybe<DistributedObjectDataType>>>;
  product: Scalars['String'];
  userId: Scalars['ID'];
  walletId?: Maybe<Scalars['String']>;
};

export type EtxProductList = {
  __typename?: 'EtxProductList';
  distribution?: Maybe<Array<Maybe<DistributionCurrency>>>;
  etxKey?: Maybe<Scalars['String']>;
  logoImage?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type EtxReBalancingPortfolio = {
  __typename?: 'EtxReBalancingPortfolio';
  fiatCurrencyCode?: Maybe<Scalars['String']>;
  lastRebalancingOn?: Maybe<Scalars['DateTime']>;
  portfolio?: Maybe<Array<Maybe<CurrencyPortFolio>>>;
  totalFiatBalance?: Maybe<Scalars['Float']>;
};

export type EtxType = {
  __typename?: 'EtxType';
  AllData?: Maybe<Array<Maybe<HistoryDataType>>>;
  Month?: Maybe<Scalars['Float']>;
  sixMonth?: Maybe<Scalars['Float']>;
  twelveMonth?: Maybe<Scalars['Float']>;
};

export type EventDetailType = {
  __typename?: 'EventDetailType';
  eventInfo: EventType;
  ticketDetails: Array<TicketDetailsType>;
};

export type EventSummaryType = {
  __typename?: 'EventSummaryType';
  eventInfo: EventType;
  ticketSummary: Array<TicketSummaryType>;
};

export type EventType = {
  __typename?: 'EventType';
  artists?: Maybe<Array<Scalars['String']>>;
  dateTime: Scalars['DateTime'];
  description: Scalars['String'];
  eventUrl: Scalars['String'];
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  isContextEnabled: Scalars['Boolean'];
  isOnline?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type FeatureType = {
  __typename?: 'FeatureType';
  description?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type FeaturesType = {
  __typename?: 'FeaturesType';
  features?: Maybe<Array<Maybe<FeatureType>>>;
  id?: Maybe<Scalars['ID']>;
};

export type GeometricSearchInput = {
  firstCoordinate?: Maybe<Array<Maybe<Scalars['Float']>>>;
  secondCoordinate?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export enum GovernmentIdInput {
  DrivingLicense = 'DRIVING_LICENSE',
  GovtId = 'GOVT_ID',
  Passport = 'PASSPORT',
  PassportCard = 'PASSPORT_CARD'
}

export type HistoryDataType = {
  __typename?: 'HistoryDataType';
  color?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ImageDimensions = {
  h?: Maybe<Scalars['Int']>;
  w?: Maybe<Scalars['Int']>;
  x?: Maybe<Scalars['Int']>;
  y?: Maybe<Scalars['Int']>;
};

export type ImportMerchantInput = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  creationMethod?: Maybe<Scalars['Float']>;
  detailedType?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  location?: Maybe<Array<Scalars['Float']>>;
  merchantType?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  streetAdditional?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  venueId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export enum MarketPeriodInput {
  All = 'ALL',
  Hour_1 = 'HOUR_1',
  Hour_24 = 'HOUR_24',
  Month_1 = 'MONTH_1',
  Week_1 = 'WEEK_1',
  Year_1 = 'YEAR_1'
}

export enum MarketSortInput {
  TopMovers = 'TOP_MOVERS'
}

export type MatchingEngineType = {
  __typename?: 'MatchingEngineType';
  image: Scalars['String'];
  link: Scalars['String'];
  name: Scalars['String'];
};

/** Status to represent the state of a membership */
export enum MembershipStatus {
  ActionsNeeded = 'ACTIONS_NEEDED',
  Approved = 'APPROVED',
  Open = 'OPEN',
  Pending = 'PENDING'
}

export type MerchantProfileType = {
  __typename?: 'MerchantProfileType';
  acceptsPayments?: Maybe<Scalars['Boolean']>;
  account?: Maybe<AccountType>;
  address?: Maybe<AddressType>;
  businessDetails?: Maybe<BusinessDetailType>;
  capabilities?: Maybe<Array<Maybe<Scalars['String']>>>;
  country?: Maybe<CountryType>;
  countryCode?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  currencyCode?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  geom?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  merchantType?: Maybe<Scalars['String']>;
  payoutsEnabled?: Maybe<Scalars['Boolean']>;
  status?: Maybe<VerificationStatus>;
};

export type MissingStripeBusinessFieldsType = {
  __typename?: 'MissingStripeBusinessFieldsType';
  id?: Maybe<Scalars['String']>;
  missingFields?: Maybe<Array<Maybe<MissingStripeField>>>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type MissingStripeField = {
  __typename?: 'MissingStripeField';
  fieldName?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Scalars['String']>>;
};

export type MissingStripePersonFieldsType = {
  __typename?: 'MissingStripePersonFieldsType';
  id?: Maybe<Scalars['String']>;
  missingFields?: Maybe<Array<Maybe<MissingStripeField>>>;
  name?: Maybe<Scalars['String']>;
  relationships?: Maybe<Array<Maybe<PersonRelationshipStatus>>>;
};

export type MissingStripeRequirementsType = {
  __typename?: 'MissingStripeRequirementsType';
  business?: Maybe<MissingStripeBusinessFieldsType>;
  persons?: Maybe<Array<Maybe<MissingStripePersonFieldsType>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBankingInfo?: Maybe<BankType>;
  /** @deprecated use addPaymentToPlatformOrder instead, using the accounts platformId associated with the orderId/eventId */
  addPaymentToOrder?: Maybe<OrderType>;
  addPaymentToPlatformOrder?: Maybe<OrderType>;
  batchDeleteAccounts?: Maybe<Array<Maybe<Scalars['String']>>>;
  batchUpdateEmail?: Maybe<Array<Maybe<Scalars['String']>>>;
  batchUpdateUsername?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** @deprecated use completeTicketPlatformOrder instead, using the accounts platformId associated with the orderId */
  completeTicketOrder?: Maybe<Scalars['String']>;
  /** @deprecated use completeTicketPlatformOrderWithPayment instead, using the accounts platformId associated with the orderId/eventId */
  completeTicketOrderWithPayment?: Maybe<OrderType>;
  completeTicketPlatformOrder?: Maybe<Scalars['String']>;
  completeTicketPlatformOrderWithPayment?: Maybe<OrderType>;
  confirmACHQuote?: Maybe<ConfirmedQuoteType>;
  confirmQuote?: Maybe<ConfirmedQuoteType>;
  createACHPayMethod?: Maybe<PaymentMethodType>;
  createAccountWallet?: Maybe<WalletType>;
  createCardAssetOrder?: Maybe<WalletOrderTransactionType>;
  createCardOrderReservation?: Maybe<ReservationType>;
  createChargeCardTransaction?: Maybe<TransactionType>;
  createCompanyStripeAccount?: Maybe<Scalars['Boolean']>;
  createCompleteTransaction?: Maybe<PaymentIntentNeedsCompletionType>;
  createIndividualStripeAccount?: Maybe<Scalars['Boolean']>;
  createMerchant?: Maybe<AccountType>;
  createNewUser?: Maybe<Scalars['String']>;
  createPaymentMethod: PaymentMethodType;
  createRefundCardTransaction?: Maybe<TransactionType>;
  createReview: ReviewType;
  deleteAccount?: Maybe<Scalars['String']>;
  deleteBank?: Maybe<Scalars['Boolean']>;
  /** @deprecated Please use deletePaymentMethod mutation which accepts the type of payment method as input along with the pmId. This mutation will be deleted on 3/4/21 */
  deleteCCPaymentMethod: DeletedCardType;
  deletePaymentMethod: DeletedCardType;
  echoCreateCompanyStripeAccount?: Maybe<StripeCompanyRedactedOutput>;
  echoCreateIndividualStripeAccount?: Maybe<StripeIndividualRedactedOutput>;
  echoUpdateStripeBanking?: Maybe<StripeBankingOutput>;
  editPaymentMethod: PaymentMethodType;
  editSingleUsername?: Maybe<Scalars['String']>;
  enterKYCInfo?: Maybe<UploadStatus>;
  etxDistribution?: Maybe<EtxDistribution>;
  etxOrderDetail?: Maybe<EtxOrderDetail>;
  etxPortfolio?: Maybe<Array<Maybe<EtxPortfolio>>>;
  etxREDistribution?: Maybe<CommonResponse>;
  etxRebalancing?: Maybe<SuccessResponse>;
  getETXBlocksWallet?: Maybe<WalletType>;
  importMerchants?: Maybe<Array<Maybe<MerchantProfileType>>>;
  importVenues?: Maybe<Array<Maybe<Scalars['String']>>>;
  logUSDExchangeRates?: Maybe<Scalars['Boolean']>;
  makeAdmin?: Maybe<Scalars['String']>;
  makeSuperAdmin?: Maybe<Scalars['String']>;
  modifyUserProfile?: Maybe<AccountType>;
  postAuthCodes?: Maybe<Scalars['Boolean']>;
  removeOverrides?: Maybe<Array<Maybe<Scalars['String']>>>;
  revokeElevatedPermissions?: Maybe<Scalars['String']>;
  startACHPurchaseQuote?: Maybe<QuoteType>;
  startETXTransferQuote?: Maybe<EtxTransferQuote>;
  startETXWithdrawlTransferQuote?: Maybe<EtxTransferQuote>;
  startExternalTransferQuote?: Maybe<QuoteType>;
  startPayoutQuote?: Maybe<QuoteType>;
  startQuote?: Maybe<QuoteType>;
  /** @deprecated use startTicketPlatformOrder instead, using the accounts platformId associated with the orderId */
  startTicketOrder?: Maybe<OrderType>;
  startTicketPlatformOrder?: Maybe<OrderType>;
  startUserTransferQuote?: Maybe<QuoteType>;
  updateAccount?: Maybe<AccountType>;
  updateAccountImage?: Maybe<AccountType>;
  updateAccountWalletDepositAddresses?: Maybe<WalletType>;
  updateMerchantProfile?: Maybe<MerchantProfileType>;
  updateStripeAccount?: Maybe<Scalars['String']>;
  updateStripeBanking?: Maybe<StripeOutputType>;
  updateUserEmail?: Maybe<Scalars['String']>;
  verifyEmail?: Maybe<Scalars['String']>;
};


export type MutationAddBankingInfoArgs = {
  accountNumber?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
  bankAccountNickname?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  bsbNumber?: Maybe<Scalars['String']>;
  clabe?: Maybe<Scalars['String']>;
  dob?: Maybe<BirthdayInput>;
  firstName?: Maybe<Scalars['String']>;
  lastFour?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  routingNumber?: Maybe<Scalars['String']>;
};


export type MutationAddPaymentToOrderArgs = {
  cvvConfirmation?: Maybe<Scalars['String']>;
  eventId?: Maybe<Scalars['String']>;
  merchantId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  payMethodId?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
};


export type MutationAddPaymentToPlatformOrderArgs = {
  cvvConfirmation?: Maybe<Scalars['String']>;
  eventId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  payMethodId?: Maybe<Scalars['String']>;
  platformId?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
};


export type MutationBatchDeleteAccountsArgs = {
  usernames?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationBatchUpdateEmailArgs = {
  emails?: Maybe<Array<Maybe<UpdateEmailInput>>>;
};


export type MutationBatchUpdateUsernameArgs = {
  updateRequests?: Maybe<Array<Maybe<UpdateUsernameInput>>>;
};


export type MutationCompleteTicketOrderArgs = {
  merchantId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
};


export type MutationCompleteTicketOrderWithPaymentArgs = {
  cvvConfirmation?: Maybe<Scalars['String']>;
  eventId?: Maybe<Scalars['String']>;
  merchantId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  payMethodId?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
};


export type MutationCompleteTicketPlatformOrderArgs = {
  orderId?: Maybe<Scalars['String']>;
  platformId?: Maybe<Scalars['String']>;
};


export type MutationCompleteTicketPlatformOrderWithPaymentArgs = {
  cvvConfirmation?: Maybe<Scalars['String']>;
  eventId?: Maybe<Scalars['String']>;
  merchantId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  payMethodId?: Maybe<Scalars['String']>;
  platformId?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
};


export type MutationConfirmAchQuoteArgs = {
  quoteId?: Maybe<Scalars['String']>;
};


export type MutationConfirmQuoteArgs = {
  assetName?: Maybe<Scalars['String']>;
  quoteId?: Maybe<Scalars['String']>;
};


export type MutationCreateAchPayMethodArgs = {
  plaidBankId?: Maybe<Scalars['String']>;
  publicToken?: Maybe<Scalars['String']>;
};


export type MutationCreateAccountWalletArgs = {
  notes?: Maybe<Scalars['String']>;
};


export type MutationCreateCardAssetOrderArgs = {
  cvvConfirmation?: Maybe<Scalars['String']>;
  destinationAddress?: Maybe<Scalars['String']>;
  destinationCurrency?: Maybe<Scalars['String']>;
  paymentMethodId?: Maybe<Scalars['String']>;
  referenceId?: Maybe<Scalars['String']>;
  reservationId?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrency?: Maybe<Scalars['String']>;
};


export type MutationCreateCardOrderReservationArgs = {
  destinationAddress?: Maybe<Scalars['String']>;
  destinationCurrency?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrency?: Maybe<Scalars['String']>;
};


export type MutationCreateChargeCardTransactionArgs = {
  amount?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  destinationAccountTag?: Maybe<Scalars['String']>;
  methodUsed: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  subtotal?: Maybe<Scalars['Int']>;
  tip?: Maybe<Scalars['Int']>;
};


export type MutationCreateCompanyStripeAccountArgs = {
  address?: Maybe<AddressInput>;
  businessDescription?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  legalName?: Maybe<Scalars['String']>;
  persons?: Maybe<Array<Maybe<StripePersonInput>>>;
  phone?: Maybe<Scalars['String']>;
  structure?: Maybe<Scalars['String']>;
  taxId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


export type MutationCreateCompleteTransactionArgs = {
  amount?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  destinationAccountTag?: Maybe<Scalars['String']>;
  methodUsed: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  subtotal?: Maybe<Scalars['Int']>;
  tip?: Maybe<Scalars['Int']>;
};


export type MutationCreateIndividualStripeAccountArgs = {
  address?: Maybe<AddressInput>;
  businessDescription?: Maybe<Scalars['String']>;
  dob?: Maybe<BirthdayInput>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  govId?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


export type MutationCreateMerchantArgs = {
  base64Image?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  dimensions?: Maybe<ImageDimensions>;
  displayName?: Maybe<Scalars['String']>;
  location?: Maybe<AddressInput>;
  merchantType?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};


export type MutationCreateNewUserArgs = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};


export type MutationCreatePaymentMethodArgs = {
  address?: Maybe<Scalars['String']>;
  cardBrand?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['String']>;
  lastFour?: Maybe<Scalars['String']>;
  nameOnCard?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  streetAdditional?: Maybe<Scalars['String']>;
  tokenizedCVC?: Maybe<Scalars['String']>;
  tokenizedCardNum?: Maybe<Scalars['String']>;
};


export type MutationCreateRefundCardTransactionArgs = {
  amount?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  destinationAccountTag?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  transaction?: Maybe<Scalars['String']>;
  txDetailId?: Maybe<Scalars['String']>;
};


export type MutationCreateReviewArgs = {
  details: Scalars['String'];
  merchantId: Scalars['String'];
  rating: Scalars['Int'];
  relatedTransaction: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  usernameToDelete?: Maybe<Scalars['String']>;
};


export type MutationDeleteBankArgs = {
  bankId?: Maybe<Scalars['String']>;
};


export type MutationDeleteCcPaymentMethodArgs = {
  ccId?: Maybe<Scalars['String']>;
};


export type MutationDeletePaymentMethodArgs = {
  paymentMethodId?: Maybe<Scalars['String']>;
  type?: Maybe<PaymentMethodCategory>;
};


export type MutationEchoCreateCompanyStripeAccountArgs = {
  address?: Maybe<AddressInput>;
  businessDescription?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  legalName?: Maybe<Scalars['String']>;
  persons?: Maybe<Array<Maybe<StripePersonInput>>>;
  phone?: Maybe<Scalars['String']>;
  structure?: Maybe<Scalars['String']>;
  taxId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


export type MutationEchoCreateIndividualStripeAccountArgs = {
  address?: Maybe<AddressInput>;
  businessDescription?: Maybe<Scalars['String']>;
  dob?: Maybe<BirthdayInput>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  govId?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


export type MutationEchoUpdateStripeBankingArgs = {
  accountNumber?: Maybe<Scalars['String']>;
  routingNumber?: Maybe<Scalars['String']>;
};


export type MutationEditPaymentMethodArgs = {
  cardBrand?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastFour?: Maybe<Scalars['String']>;
  nameOnCard?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  streetAdditional?: Maybe<Scalars['String']>;
  tokenizedCVC?: Maybe<Scalars['String']>;
  tokenizedCardNum?: Maybe<Scalars['String']>;
};


export type MutationEditSingleUsernameArgs = {
  currentUsername?: Maybe<Scalars['String']>;
  requestedUsername?: Maybe<Scalars['String']>;
};


export type MutationEnterKycInfoArgs = {
  address: AddressInput;
  dateOFBirth: BirthdayInput;
  govIdBack?: Maybe<Scalars['String']>;
  govIdFront: Scalars['String'];
  govIdType: GovernmentIdInput;
  individualSsn: Scalars['String'];
  legalFirstName: Scalars['String'];
  legalLastName: Scalars['String'];
};


export type MutationEtxDistributionArgs = {
  amount?: Maybe<Scalars['Float']>;
  amountCurrency?: Maybe<Scalars['String']>;
  product?: Maybe<Scalars['String']>;
  transactionType?: Maybe<Scalars['String']>;
  userEmail?: Maybe<Scalars['String']>;
};


export type MutationEtxOrderDetailArgs = {
  uuid?: Maybe<Scalars['String']>;
};


export type MutationEtxPortfolioArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type MutationEtxReDistributionArgs = {
  product?: Maybe<Scalars['String']>;
  transfers?: Maybe<Array<Maybe<TransferFields>>>;
  userId?: Maybe<Scalars['String']>;
};


export type MutationEtxRebalancingArgs = {
  uuId?: Maybe<Scalars['String']>;
};


export type MutationGetEtxBlocksWalletArgs = {
  notes?: Maybe<Scalars['String']>;
};


export type MutationImportMerchantsArgs = {
  merchants?: Maybe<Array<Maybe<ImportMerchantInput>>>;
};


export type MutationImportVenuesArgs = {
  platform?: Maybe<Scalars['String']>;
};


export type MutationMakeAdminArgs = {
  username?: Maybe<Scalars['String']>;
};


export type MutationMakeSuperAdminArgs = {
  username?: Maybe<Scalars['String']>;
};


export type MutationModifyUserProfileArgs = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};


export type MutationPostAuthCodesArgs = {
  card2Fa?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  reservationId?: Maybe<Scalars['String']>;
  sms?: Maybe<Scalars['String']>;
};


export type MutationRemoveOverridesArgs = {
  merchantsUsernames?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationRevokeElevatedPermissionsArgs = {
  username?: Maybe<Scalars['String']>;
};


export type MutationStartAchPurchaseQuoteArgs = {
  destAmount?: Maybe<Scalars['String']>;
  destinationCurrencyCode?: Maybe<Scalars['String']>;
  maxOption?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  paymentMethodId?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrencyCode?: Maybe<Scalars['String']>;
};


export type MutationStartEtxTransferQuoteArgs = {
  etxDistributionuuid?: Maybe<Scalars['String']>;
  maxOption?: Maybe<Scalars['Boolean']>;
};


export type MutationStartEtxWithdrawlTransferQuoteArgs = {
  etxDistributionuuid?: Maybe<Scalars['String']>;
  maxOption?: Maybe<Scalars['Boolean']>;
};


export type MutationStartExternalTransferQuoteArgs = {
  destAmount?: Maybe<Scalars['String']>;
  destinationCurrencyCode?: Maybe<Scalars['String']>;
  externalAddress?: Maybe<Scalars['String']>;
  maxOption?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrencyCode?: Maybe<Scalars['String']>;
};


export type MutationStartPayoutQuoteArgs = {
  bankAccountId?: Maybe<Scalars['String']>;
  destAmount?: Maybe<Scalars['String']>;
  destinationCurrencyCode?: Maybe<Scalars['String']>;
  maxOption?: Maybe<Scalars['Boolean']>;
  sourceCurrencyCode?: Maybe<Scalars['String']>;
};


export type MutationStartQuoteArgs = {
  destAmount?: Maybe<Scalars['String']>;
  destinationCurrencyCode?: Maybe<Scalars['String']>;
  maxOption?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrencyCode?: Maybe<Scalars['String']>;
};


export type MutationStartTicketOrderArgs = {
  merchantId?: Maybe<Scalars['String']>;
  platformEventId?: Maybe<Scalars['String']>;
  tickets?: Maybe<Array<Maybe<TicketsWithAmount>>>;
};


export type MutationStartTicketPlatformOrderArgs = {
  platformEventId?: Maybe<Scalars['String']>;
  platformId?: Maybe<Scalars['String']>;
  tickets?: Maybe<Array<Maybe<TicketsWithAmount>>>;
};


export type MutationStartUserTransferQuoteArgs = {
  destAmount?: Maybe<Scalars['String']>;
  destination?: Maybe<Scalars['String']>;
  destinationCurrencyCode?: Maybe<Scalars['String']>;
  maxOption?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrencyCode?: Maybe<Scalars['String']>;
};


export type MutationUpdateAccountArgs = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};


export type MutationUpdateAccountImageArgs = {
  dimensions?: Maybe<ImageDimensions>;
  image?: Maybe<Scalars['String']>;
};


export type MutationUpdateMerchantProfileArgs = {
  currency?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  location?: Maybe<AddressInput>;
  merchantType?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};


export type MutationUpdateStripeAccountArgs = {
  business?: Maybe<StripeUpdateBusinessFieldsInput>;
  persons?: Maybe<Array<Maybe<StripeUpdatePersonFieldsInput>>>;
};


export type MutationUpdateStripeBankingArgs = {
  accountNumber?: Maybe<Scalars['String']>;
  routingNumber?: Maybe<Scalars['String']>;
};


export type MutationUpdateUserEmailArgs = {
  autoVerify?: Maybe<Scalars['Boolean']>;
  currentEmail?: Maybe<Scalars['String']>;
  requestedEmail?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


export type MutationVerifyEmailArgs = {
  email?: Maybe<Scalars['String']>;
};

export type NewsType = {
  __typename?: 'NewsType';
  createdOn?: Maybe<DateOfCreation>;
  imageUrl: Scalars['String'];
  sourceName?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  tickers: Array<Scalars['String']>;
  title: Scalars['String'];
  topics: Array<Scalars['String']>;
  url: Scalars['String'];
};

export type OrderPercentageFields = {
  __typename?: 'OrderPercentageFields';
  currencyCode?: Maybe<Scalars['String']>;
  currencyName?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  percentage?: Maybe<Scalars['String']>;
};

export type OrderType = {
  __typename?: 'OrderType';
  eventId?: Maybe<Scalars['String']>;
  fees?: Maybe<Scalars['Float']>;
  orderFees?: Maybe<ValueDisplay>;
  orderId: Scalars['ID'];
  orderSubtotal?: Maybe<ValueDisplay>;
  orderTotal?: Maybe<ValueDisplay>;
  paymentEntered?: Maybe<Scalars['Boolean']>;
  subtotal?: Maybe<Scalars['Float']>;
  successMessage?: Maybe<Scalars['String']>;
  tickets?: Maybe<Array<Maybe<TicketConfirmationType>>>;
  timeRemainingInSecs?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type PaymentIntentNeedsCompletionType = {
  __typename?: 'PaymentIntentNeedsCompletionType';
  intentSecret?: Maybe<Scalars['String']>;
  transaction?: Maybe<TransactionType>;
};

export enum PaymentMethodCategory {
  Ach = 'ACH',
  Bank = 'BANK',
  Card = 'CARD'
}

export enum PaymentMethodStatus {
  ActionsNeeded = 'ACTIONS_NEEDED',
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Pending = 'PENDING',
  Suspended = 'SUSPENDED'
}

export type PaymentMethodType = {
  __typename?: 'PaymentMethodType';
  PostalAddress?: Maybe<Scalars['String']>;
  account?: Maybe<AccountType>;
  /** @deprecated We will use other address components instead of this general one */
  address?: Maybe<Scalars['String']>;
  cardBrand?: Maybe<CardBrand>;
  cityAddress?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastFour?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  status?: Maybe<PaymentMethodStatus>;
  streetAdditional?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  type: PaymentMethodCategory;
};

export type PayoutItemType = {
  __typename?: 'PayoutItemType';
  amount?: Maybe<ValueDisplay>;
  date?: Maybe<Scalars['DateTime']>;
  status?: Maybe<Scalars['String']>;
};

export type PayoutSummaryType = {
  __typename?: 'PayoutSummaryType';
  available?: Maybe<ValueDisplay>;
  currency?: Maybe<Scalars['String']>;
  currentBalance?: Maybe<Scalars['Float']>;
  hasBanking?: Maybe<Scalars['Boolean']>;
  payoutHistory?: Maybe<Array<PayoutItemType>>;
  pending?: Maybe<ValueDisplay>;
  pendingBalance?: Maybe<Scalars['Float']>;
};

/** Describes a persons relationship to their respective business */
export enum PersonRelationshipStatus {
  Director = 'DIRECTOR',
  Executive = 'EXECUTIVE',
  Individual = 'INDIVIDUAL',
  Owner = 'OWNER',
  Representative = 'REPRESENTATIVE'
}

export type PlatformMembershipType = {
  __typename?: 'PlatformMembershipType';
  requirements?: Maybe<Array<Scalars['String']>>;
  status?: Maybe<MembershipStatus>;
};

export type Price = {
  __typename?: 'Price';
  price: Scalars['Float'];
};

export type ProvidersType = {
  __typename?: 'ProvidersType';
  available?: Maybe<Scalars['Boolean']>;
  provider?: Maybe<Scalars['String']>;
};

export type QrType = {
  __typename?: 'QRType';
  code?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get account by username */
  account?: Maybe<AccountType>;
  accountById: AccountType;
  /** Get list of accounts that current user has access to */
  accounts?: Maybe<Array<Maybe<AccountType>>>;
  allArticles?: Maybe<Array<Maybe<NewsType>>>;
  assetMetrics?: Maybe<AssetMetricType>;
  availableProviders?: Maybe<Array<Maybe<ProvidersType>>>;
  conversionRate?: Maybe<Scalars['Float']>;
  convertCurrencyAmount?: Maybe<ConversionResult>;
  features?: Maybe<FeaturesType>;
  getACHQuote?: Maybe<QuoteType>;
  /** @deprecated use assetMetrics(assetName) { history(period: ) {} } query instead by 2/01/2022 */
  getAssetHistory?: Maybe<SingleAssetHistoryType>;
  getAssetMetrics?: Maybe<AssetMetricType>;
  getBanks?: Maybe<Array<Maybe<BankType>>>;
  getBlocks?: Maybe<BlocksType>;
  getCardOrderReservation?: Maybe<ReservationType>;
  getCarouselAssets?: Maybe<Array<Maybe<CarouselType>>>;
  getCryptoTransactionsByAsset?: Maybe<Array<Maybe<AssetTransactionType>>>;
  getEtxHistory?: Maybe<EtxType>;
  getEtxProduct?: Maybe<EtxProductList>;
  getEtxWalletBalance?: Maybe<WalletType>;
  getEvent?: Maybe<EventDetailType>;
  getFullOrder?: Maybe<WalletOrderType>;
  getMarketList?: Maybe<AssetMarketMetricList>;
  /** @deprecated use getPlatformOrder instead, using the accounts platformId associated with the orderId */
  getOrder?: Maybe<OrderType>;
  getPayoutQuote?: Maybe<QuoteType>;
  getPayoutSummary?: Maybe<PayoutSummaryType>;
  getPlatformOrder?: Maybe<OrderType>;
  getQuote?: Maybe<QuoteType>;
  getRecentTransactions?: Maybe<Array<Maybe<AssetTransactionType>>>;
  getSinglePaymentMethod: PaymentMethodType;
  getToken?: Maybe<Scalars['String']>;
  getTransactions?: Maybe<TransactionResultsType>;
  getVenueById?: Maybe<VenueType>;
  /** @deprecated use wallet { balanceHistory(period: ) {} }  query instead by 2/01/2022 */
  getWalletBalanceHistory?: Maybe<AssetBalanceHistoryType>;
  getetxPortfolio?: Maybe<EtxReBalancingPortfolio>;
  isCryptoWalletFeatureEnabled?: Maybe<Scalars['Boolean']>;
  isUsernameAvailable?: Maybe<Scalars['Boolean']>;
  matchingEngineCards?: Maybe<Array<Maybe<MatchingEngineType>>>;
  matchingEngineLenders?: Maybe<Array<Maybe<MatchingEngineType>>>;
  /** Get current users selected account */
  me: AccountType;
  merchant?: Maybe<MerchantProfileType>;
  missingStripeRequirements?: Maybe<MissingStripeRequirementsType>;
  myAssetAddress?: Maybe<CryptoAddressQrType>;
  myAssetInterestRates?: Maybe<Array<Maybe<AssetInterestRateType>>>;
  /** @deprecated use wallet { assets {} } query instead instead by 2/01/2022 */
  myAssets?: Maybe<Array<Maybe<AssetBalanceType>>>;
  myAssetsEnoughToPurchase?: Maybe<Array<Maybe<AssetBalanceType>>>;
  myAssetsInterestSummary?: Maybe<AssetInterestSummaryType>;
  myMerchantProfile?: Maybe<MerchantProfileType>;
  myUserProfile?: Maybe<UserType>;
  paymentMethods: Array<PaymentMethodType>;
  priceDisplay?: Maybe<ValueDisplay>;
  reviews: ReviewResultsType;
  searchAccounts?: Maybe<Array<Maybe<AccountType>>>;
  searchAccountsByGeom?: Maybe<Array<Maybe<AccountType>>>;
  searchForUserContacts?: Maybe<Array<Maybe<AccountType>>>;
  transaction?: Maybe<TransactionType>;
  transactionsToMe?: Maybe<TransactionResultsType>;
  user?: Maybe<UserType>;
  wallet?: Maybe<WalletType>;
};


export type QueryAccountArgs = {
  username?: Maybe<Scalars['String']>;
};


export type QueryAccountByIdArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryAllArticlesArgs = {
  ticker?: Maybe<Scalars['String']>;
};


export type QueryAssetMetricsArgs = {
  assetName?: Maybe<Scalars['String']>;
};


export type QueryConversionRateArgs = {
  destinationCurrency?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrency?: Maybe<Scalars['String']>;
};


export type QueryGetAchQuoteArgs = {
  quoteId?: Maybe<Scalars['String']>;
};


export type QueryGetAssetHistoryArgs = {
  assetName?: Maybe<Scalars['String']>;
  period?: Maybe<MarketPeriodInput>;
};


export type QueryGetAssetMetricsArgs = {
  assetName?: Maybe<Scalars['String']>;
};


export type QueryGetCardOrderReservationArgs = {
  assetName?: Maybe<Scalars['String']>;
  reservationId?: Maybe<Scalars['String']>;
};


export type QueryGetCarouselAssetsArgs = {
  acceptsPayments?: Maybe<Scalars['Boolean']>;
  isMerchant?: Maybe<Scalars['Boolean']>;
};


export type QueryGetCryptoTransactionsByAssetArgs = {
  asset?: Maybe<Scalars['String']>;
  seeAll?: Maybe<Scalars['Boolean']>;
};


export type QueryGetEtxWalletBalanceArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetEventArgs = {
  merchantId?: Maybe<Scalars['String']>;
  platformEventId?: Maybe<Scalars['String']>;
  venuePlatformId?: Maybe<Scalars['String']>;
};


export type QueryGetFullOrderArgs = {
  assetName?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
};


export type QueryGetMarketListArgs = {
  interestOnly?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  period?: Maybe<MarketPeriodInput>;
  sortBy?: Maybe<MarketSortInput>;
  type?: Maybe<Scalars['String']>;
};


export type QueryGetOrderArgs = {
  merchantId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
};


export type QueryGetPayoutQuoteArgs = {
  quoteId?: Maybe<Scalars['String']>;
};


export type QueryGetPayoutSummaryArgs = {
  after?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Float']>;
};


export type QueryGetPlatformOrderArgs = {
  orderId?: Maybe<Scalars['String']>;
  platformId?: Maybe<Scalars['String']>;
};


export type QueryGetQuoteArgs = {
  assetName?: Maybe<Scalars['String']>;
  quoteId?: Maybe<Scalars['String']>;
};


export type QueryGetRecentTransactionsArgs = {
  asset?: Maybe<Scalars['String']>;
  seeAll?: Maybe<Scalars['Boolean']>;
  transactionCategory?: Maybe<Scalars['String']>;
};


export type QueryGetSinglePaymentMethodArgs = {
  pmId?: Maybe<Scalars['String']>;
};


export type QueryGetTransactionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryGetVenueByIdArgs = {
  merchant?: Maybe<Scalars['String']>;
};


export type QueryGetWalletBalanceHistoryArgs = {
  period?: Maybe<MarketPeriodInput>;
};


export type QueryIsUsernameAvailableArgs = {
  keyword?: Maybe<Scalars['String']>;
};


export type QueryMerchantArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryMyAssetAddressArgs = {
  asset?: Maybe<Scalars['String']>;
};


export type QueryMyAssetsArgs = {
  currency?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type QueryMyAssetsEnoughToPurchaseArgs = {
  purchaseAmount?: Maybe<Scalars['String']>;
  purchaseCurrency?: Maybe<Scalars['String']>;
};


export type QueryPaymentMethodsArgs = {
  type?: Maybe<PaymentMethodCategory>;
};


export type QueryReviewsArgs = {
  limit?: Maybe<Scalars['Int']>;
  merchantId?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
};


export type QuerySearchAccountsArgs = {
  isMerchant?: Maybe<Scalars['Boolean']>;
  searchString?: Maybe<Scalars['String']>;
};


export type QuerySearchAccountsByGeomArgs = {
  geom?: Maybe<GeometricSearchInput>;
};


export type QuerySearchForUserContactsArgs = {
  contacts?: Maybe<Array<Maybe<ContactInput>>>;
};


export type QueryTransactionArgs = {
  transactionId?: Maybe<Scalars['String']>;
};


export type QueryTransactionsToMeArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>;
};

export type QuoteFees = {
  __typename?: 'QuoteFees';
  currencyName?: Maybe<Scalars['String']>;
  feeAmount?: Maybe<Scalars['Float']>;
};

export type QuoteType = {
  __typename?: 'QuoteType';
  destination: Scalars['String'];
  destinationAmount?: Maybe<Scalars['Float']>;
  destinationCurrency?: Maybe<Scalars['String']>;
  destinationCurrencyCode?: Maybe<Scalars['String']>;
  exchangeRate?: Maybe<Scalars['Float']>;
  expiresAt?: Maybe<Scalars['Float']>;
  fiatAmount: Scalars['Float'];
  fiatCurrencyCode: Scalars['String'];
  fiatFees?: Maybe<Scalars['Float']>;
  /** Flag to determin if this transfer is an internal quote between Humbl wallets or external */
  isInternal?: Maybe<Scalars['Boolean']>;
  logoImage?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  paymentName?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  quoteId?: Maybe<Scalars['String']>;
  sourceAmount: Scalars['String'];
  sourceCurrency: Scalars['String'];
  sourceCurrencyCode: Scalars['String'];
  sourceFee?: Maybe<Scalars['Float']>;
};

export type ReservationType = {
  __typename?: 'ReservationType';
  destinationAmount?: Maybe<Scalars['Float']>;
  destinationCurrency?: Maybe<Scalars['String']>;
  exchangeRate?: Maybe<Scalars['Float']>;
  fees?: Maybe<Array<Maybe<QuoteFees>>>;
  reservationId?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['Float']>;
  sourceCurrency?: Maybe<Scalars['String']>;
};

export type ReviewResultsType = {
  __typename?: 'ReviewResultsType';
  nodes?: Maybe<Array<Maybe<ReviewType>>>;
  pageInfo: PageInfo;
};

export type ReviewType = {
  __typename?: 'ReviewType';
  account?: Maybe<AccountType>;
  averageRating?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  detail?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  rating?: Maybe<Scalars['Float']>;
  transaction?: Maybe<TransactionType>;
};

export type SingleAssetHistoryType = {
  __typename?: 'SingleAssetHistoryType';
  asset?: Maybe<AssetType>;
  end?: Maybe<Scalars['DateTime']>;
  firstValidPointIndex?: Maybe<Scalars['Float']>;
  history?: Maybe<Array<Maybe<AssetHistoryPointType>>>;
  maxPrice?: Maybe<Scalars['Float']>;
  minPrice?: Maybe<Scalars['Float']>;
  period?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
};

export type StripeBankingOutput = {
  __typename?: 'StripeBankingOutput';
  accountNumber?: Maybe<Scalars['String']>;
};

export enum StripeBusinessTypeInput {
  Company = 'COMPANY',
  Individual = 'INDIVIDUAL'
}

export type StripeCompanyRedactedOutput = {
  __typename?: 'StripeCompanyRedactedOutput';
  personsGovIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type StripeIndividualRedactedOutput = {
  __typename?: 'StripeIndividualRedactedOutput';
  /** For U.S. this is their SSN */
  govId?: Maybe<Scalars['String']>;
};

export type StripeOutputType = {
  __typename?: 'StripeOutputType';
  currentlyDueRequirements?: Maybe<Array<Maybe<Scalars['String']>>>;
  eventuallyDueRequirements?: Maybe<Array<Maybe<Scalars['String']>>>;
  pastDueRequirements?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<Scalars['Float']>;
  /** @deprecated use past/currently/eventuallyDueRequirements instead by 2/01/2022 */
  verificationRequirements?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type StripePersonInput = {
  address?: Maybe<AddressInput>;
  dob?: Maybe<BirthdayInput>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  /** For U.S. this is their SSN */
  govId?: Maybe<Scalars['String']>;
  isDirector?: Maybe<Scalars['Boolean']>;
  isExecutive?: Maybe<Scalars['Boolean']>;
  isOwner?: Maybe<Scalars['Boolean']>;
  isRepresentative?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type StripeUpdateBusinessFieldsInput = {
  fields?: Maybe<Array<Maybe<StripeUpdateFieldInput>>>;
  govId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  type?: Maybe<StripeBusinessTypeInput>;
};

export type StripeUpdateFieldInput = {
  fieldName?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type StripeUpdatePersonFieldsInput = {
  fields?: Maybe<Array<Maybe<StripeUpdateFieldInput>>>;
  govId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  relationships?: Maybe<Array<Maybe<PersonRelationshipStatus>>>;
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
};

export type TicketConfirmationType = {
  __typename?: 'TicketConfirmationType';
  id: Scalars['ID'];
  price?: Maybe<ValueDisplay>;
  quantity?: Maybe<Scalars['Float']>;
  subtotalPrice?: Maybe<ValueDisplay>;
  type?: Maybe<Scalars['String']>;
};

export type TicketDetailsType = {
  __typename?: 'TicketDetailsType';
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  maximumPerOrder?: Maybe<Scalars['Int']>;
  minimumPerOrder?: Maybe<Scalars['Int']>;
  price?: Maybe<ValueDisplay>;
  saleEnd?: Maybe<Scalars['DateTime']>;
  saleStart?: Maybe<Scalars['DateTime']>;
  status?: Maybe<TicketStatus>;
  type?: Maybe<Scalars['String']>;
};

/** Ticket status if sold out, selling fast, etc */
export enum TicketStatus {
  Active = 'ACTIVE',
  SellingFast = 'SELLING_FAST',
  SoldOut = 'SOLD_OUT'
}

export type TicketSummaryType = {
  __typename?: 'TicketSummaryType';
  price?: Maybe<ValueDisplay>;
  saleStart?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Scalars['String']>;
};

export type TicketsWithAmount = {
  id?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Float']>;
};

export type TransactionResultsType = {
  __typename?: 'TransactionResultsType';
  nodes?: Maybe<Array<Maybe<TransactionType>>>;
  pageInfo: PageInfo;
};

export type TransactionType = {
  __typename?: 'TransactionType';
  amount?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  dateOfTransaction?: Maybe<Scalars['DateTime']>;
  destination?: Maybe<AccountType>;
  id: Scalars['ID'];
  isRefunded?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  origin?: Maybe<AccountType>;
  receiver?: Maybe<AccountType>;
  sender?: Maybe<AccountType>;
  status?: Maybe<Scalars['String']>;
  subtotal?: Maybe<Scalars['Float']>;
  tip?: Maybe<Scalars['Float']>;
  tipAmount?: Maybe<ValueDisplay>;
  total?: Maybe<ValueDisplay>;
  transactionType?: Maybe<Scalars['String']>;
  txDetail?: Maybe<Scalars['String']>;
};

export type TransferFields = {
  destAmount?: Maybe<Scalars['Float']>;
  destCurrency?: Maybe<Scalars['String']>;
  srcAmount?: Maybe<Scalars['Float']>;
  srcCurrency?: Maybe<Scalars['String']>;
};

export type UpdateEmailInput = {
  autoVerify?: Maybe<Scalars['Boolean']>;
  currentEmail?: Maybe<Scalars['String']>;
  requestedEmail?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UpdateUsernameInput = {
  currentUsername?: Maybe<Scalars['String']>;
  requestedUsername?: Maybe<Scalars['String']>;
};

export type UploadStatus = {
  __typename?: 'UploadStatus';
  confirmedUpload?: Maybe<Scalars['Boolean']>;
  fields?: Maybe<Array<Maybe<UploadStatuses>>>;
  generalError?: Maybe<Scalars['String']>;
  persistanceError?: Maybe<Scalars['String']>;
};

export type UploadStatuses = {
  __typename?: 'UploadStatuses';
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type UserType = {
  __typename?: 'UserType';
  createdOn?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  isVerified?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  verifiedOn?: Maybe<Scalars['String']>;
};

export type ValueDisplay = {
  __typename?: 'ValueDisplay';
  display?: Maybe<Scalars['String']>;
  major?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

export type VenueEventsType = {
  __typename?: 'VenueEventsType';
  events?: Maybe<Array<Maybe<EventSummaryType>>>;
};

export type VenueType = {
  __typename?: 'VenueType';
  account?: Maybe<AccountType>;
  merchant?: Maybe<MerchantProfileType>;
  platform?: Maybe<Scalars['String']>;
  platformId?: Maybe<Scalars['String']>;
  venueEvents?: Maybe<VenueEventsType>;
};

/** Merchant status with PSP */
export enum VerificationStatus {
  FullyVerified = 'FULLY_VERIFIED',
  LimitedChargesEnabled = 'LIMITED_CHARGES_ENABLED',
  LimitedPayoutsEnabled = 'LIMITED_PAYOUTS_ENABLED',
  LimitedVerified = 'LIMITED_VERIFIED',
  NotVerified = 'NOT_VERIFIED',
  Pending = 'PENDING'
}

export type WalletOrderTransactionType = {
  __typename?: 'WalletOrderTransactionType';
  reservationId?: Maybe<Scalars['String']>;
  transaction?: Maybe<TransactionType>;
  walletOrder?: Maybe<WalletOrderType>;
};

export type WalletOrderType = {
  __typename?: 'WalletOrderType';
  auth3dUrl?: Maybe<Scalars['String']>;
  card2faNeeded?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['String']>;
  destinationAmount: Scalars['String'];
  destinationCurrency?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  paymentMethodId?: Maybe<Scalars['String']>;
  purchaseAmount?: Maybe<Scalars['Float']>;
  smsNeeded?: Maybe<Scalars['Boolean']>;
  sourceAmountDue?: Maybe<Scalars['Float']>;
  sourceCurrency?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type WalletType = {
  __typename?: 'WalletType';
  assets?: Maybe<Array<Maybe<AssetBalanceType>>>;
  avaxDepositAddress?: Maybe<Scalars['String']>;
  balanceHistory?: Maybe<AssetBalanceHistoryType>;
  /** @deprecated use wallet { assets {} } for more data instead by 2/01/2022 */
  balances?: Maybe<CoinBalanceType>;
  btcDepositAddress?: Maybe<Scalars['String']>;
  ethDepositAddress?: Maybe<Scalars['String']>;
  hasAssets?: Maybe<Scalars['Boolean']>;
  hasInterestGainingAssets?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  platformId?: Maybe<Scalars['String']>;
  totalFiatBalance?: Maybe<ValueDisplay>;
  xlmDepositAddress?: Maybe<Scalars['String']>;
};


export type WalletTypeAssetsArgs = {
  type?: Maybe<Scalars['String']>;
};


export type WalletTypeBalanceHistoryArgs = {
  period?: Maybe<MarketPeriodInput>;
};

export type AddCreditCardMutationVariables = Exact<{
  cardBrand: Scalars['String'];
  tokenizedCardNum: Scalars['String'];
  tokenizedCVC: Scalars['String'];
  nameOnCard: Scalars['String'];
  expirationDate: Scalars['String'];
  lastFour: Scalars['String'];
  street: Scalars['String'];
  streetAdditional: Scalars['String'];
  city: Scalars['String'];
  postal: Scalars['String'];
  region: Scalars['String'];
  country: Scalars['String'];
}>;


export type AddCreditCardMutation = (
  { __typename?: 'Mutation' }
  & { createPaymentMethod: (
    { __typename?: 'PaymentMethodType' }
    & Pick<PaymentMethodType, 'id' | 'lastFour' | 'status' | 'type' | 'expirationDate' | 'name'>
    & { cardBrand?: Maybe<(
      { __typename?: 'CardBrand' }
      & Pick<CardBrand, 'id' | 'display' | 'image'>
    )> }
  ) }
);

export type UpdateAccountImageMutationVariables = Exact<{
  image?: Maybe<Scalars['String']>;
  dimensions?: Maybe<ImageDimensions>;
}>;


export type UpdateAccountImageMutation = (
  { __typename?: 'Mutation' }
  & { updateAccountImage?: Maybe<(
    { __typename?: 'AccountType' }
    & Pick<AccountType, 'image'>
  )> }
);

export type CompleteTicketOrderWithPaymentMutationVariables = Exact<{
  orderId?: Maybe<Scalars['String']>;
  eventId?: Maybe<Scalars['String']>;
  merchantId?: Maybe<Scalars['String']>;
  payMethodId?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  cvv?: Maybe<Scalars['String']>;
}>;


export type CompleteTicketOrderWithPaymentMutation = (
  { __typename?: 'Mutation' }
  & { completeTicketOrderWithPayment?: Maybe<(
    { __typename?: 'OrderType' }
    & Pick<OrderType, 'successMessage'>
  )> }
);

export type CreateCompanyStripeAccountMutationVariables = Exact<{
  legalName?: Maybe<Scalars['String']>;
  taxId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
  phone?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  businessDescription?: Maybe<Scalars['String']>;
  structure?: Maybe<Scalars['String']>;
  persons?: Maybe<Array<Maybe<StripePersonInput>> | Maybe<StripePersonInput>>;
}>;


export type CreateCompanyStripeAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createCompanyStripeAccount'>
);

export type CreateCompleteTransactionMutationVariables = Exact<{
  tip: Scalars['Int'];
  amount: Scalars['Int'];
  subtotal: Scalars['Int'];
  currency: Scalars['String'];
  destinationAccountTag: Scalars['String'];
  methodUsed: Scalars['String'];
}>;


export type CreateCompleteTransactionMutation = (
  { __typename?: 'Mutation' }
  & { createCompleteTransaction?: Maybe<(
    { __typename?: 'PaymentIntentNeedsCompletionType' }
    & Pick<PaymentIntentNeedsCompletionType, 'intentSecret'>
    & { transaction?: Maybe<(
      { __typename?: 'TransactionType' }
      & Pick<TransactionType, 'id' | 'amount' | 'transactionType'>
    )> }
  )> }
);

export type CreateIndividualStripeAccountMutationVariables = Exact<{
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  dob?: Maybe<BirthdayInput>;
  email?: Maybe<Scalars['String']>;
  govId?: Maybe<Scalars['String']>;
  businessDescription?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
  website?: Maybe<Scalars['String']>;
}>;


export type CreateIndividualStripeAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createIndividualStripeAccount'>
);

export type CreateMerchantMutationVariables = Exact<{
  displayName?: Maybe<Scalars['String']>;
  merchantType?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  location?: Maybe<AddressInput>;
  base64Image?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
}>;


export type CreateMerchantMutation = (
  { __typename?: 'Mutation' }
  & { createMerchant?: Maybe<(
    { __typename?: 'AccountType' }
    & Pick<AccountType, 'userName' | 'hasMultipleAccounts' | 'hasMerchantAccount' | 'isMerchant' | 'displayName' | 'image' | 'id' | 'city' | 'isPrivate' | 'phone'>
    & { country?: Maybe<(
      { __typename?: 'CountryType' }
      & Pick<CountryType, 'name' | 'alpha2'>
    )>, qr?: Maybe<(
      { __typename?: 'QRType' }
      & Pick<QrType, 'image' | 'code'>
    )>, merchantProfileDetails?: Maybe<(
      { __typename?: 'MerchantProfileType' }
      & Pick<MerchantProfileType, 'id' | 'merchantType' | 'displayName' | 'currency' | 'countryCode' | 'acceptsPayments'>
      & { address?: Maybe<(
        { __typename?: 'AddressType' }
        & Pick<AddressType, 'street' | 'streetAdditional' | 'city' | 'region' | 'postal'>
      )> }
    )> }
  )> }
);

export type CreateMerchantTransactionMutationVariables = Exact<{
  tip: Scalars['Int'];
  amount: Scalars['Int'];
  subtotal: Scalars['Int'];
  currency: Scalars['String'];
  destinationAccountTag: Scalars['String'];
  methodUsed: Scalars['String'];
}>;


export type CreateMerchantTransactionMutation = (
  { __typename?: 'Mutation' }
  & { createChargeCardTransaction?: Maybe<(
    { __typename?: 'TransactionType' }
    & Pick<TransactionType, 'id'>
  )> }
);

export type CreateNewUserMutationVariables = Exact<{
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
}>;


export type CreateNewUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createNewUser'>
);

export type CreateRefundCardTransactionMutationVariables = Exact<{
  amount?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  transaction?: Maybe<Scalars['String']>;
  destinationAccountTag?: Maybe<Scalars['String']>;
  txDetailId?: Maybe<Scalars['String']>;
}>;


export type CreateRefundCardTransactionMutation = (
  { __typename?: 'Mutation' }
  & { createRefundCardTransaction?: Maybe<(
    { __typename?: 'TransactionType' }
    & Pick<TransactionType, 'id' | 'dateOfTransaction' | 'amount' | 'currency' | 'isRefunded'>
    & { receiver?: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, 'id' | 'userName' | 'displayName' | 'image'>
    )>, sender?: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, 'id' | 'userName' | 'displayName' | 'image'>
    )>, total?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'major' | 'value' | 'display'>
    )> }
  )> }
);

export type CreateReviewMutationVariables = Exact<{
  rating: Scalars['Int'];
  details: Scalars['String'];
  merchantId: Scalars['String'];
  relatedTransaction: Scalars['String'];
}>;


export type CreateReviewMutation = (
  { __typename?: 'Mutation' }
  & { createReview: (
    { __typename?: 'ReviewType' }
    & Pick<ReviewType, 'id'>
  ) }
);

export type StartTicketOrderMutationVariables = Exact<{
  tickets?: Maybe<Array<Maybe<TicketsWithAmount>> | Maybe<TicketsWithAmount>>;
  merchantId?: Maybe<Scalars['String']>;
  platformEventId?: Maybe<Scalars['String']>;
}>;


export type StartTicketOrderMutation = (
  { __typename?: 'Mutation' }
  & { startTicketOrder?: Maybe<(
    { __typename?: 'OrderType' }
    & Pick<OrderType, 'orderId'>
  )> }
);

export type ConfirmAchQuoteMutationVariables = Exact<{
  quoteId?: Maybe<Scalars['String']>;
}>;


export type ConfirmAchQuoteMutation = (
  { __typename?: 'Mutation' }
  & { confirmACHQuote?: Maybe<(
    { __typename?: 'ConfirmedQuoteType' }
    & Pick<ConfirmedQuoteType, 'sourceAmount' | 'sourceCurrencyCode' | 'destinationAmount' | 'email' | 'transactionId' | 'fiatAmount' | 'fiatCurrencyCode'>
  )> }
);

export type ConfirmTransferQuoteMutationVariables = Exact<{
  quoteId?: Maybe<Scalars['String']>;
  assetCode?: Maybe<Scalars['String']>;
}>;


export type ConfirmTransferQuoteMutation = (
  { __typename?: 'Mutation' }
  & { confirmQuote?: Maybe<(
    { __typename?: 'ConfirmedQuoteType' }
    & Pick<ConfirmedQuoteType, 'sourceAmount' | 'sourceCurrencyCode' | 'destinationAmount' | 'email' | 'transactionId' | 'fiatAmount' | 'fiatCurrencyCode'>
  )> }
);

export type CreateAchPaymentMethodMutationVariables = Exact<{
  publicToken: Scalars['String'];
  plaidBankId: Scalars['String'];
}>;


export type CreateAchPaymentMethodMutation = (
  { __typename?: 'Mutation' }
  & { createACHPayMethod?: Maybe<(
    { __typename?: 'PaymentMethodType' }
    & Pick<PaymentMethodType, 'id' | 'lastFour' | 'status' | 'type' | 'expirationDate' | 'name'>
    & { cardBrand?: Maybe<(
      { __typename?: 'CardBrand' }
      & Pick<CardBrand, 'id' | 'display' | 'image'>
    )> }
  )> }
);

export type CreateCardAssetOrderMutationVariables = Exact<{
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrency?: Maybe<Scalars['String']>;
  reservationId?: Maybe<Scalars['String']>;
  paymentMethodId?: Maybe<Scalars['String']>;
  cvvConfirmation?: Maybe<Scalars['String']>;
  destinationCurrency?: Maybe<Scalars['String']>;
}>;


export type CreateCardAssetOrderMutation = (
  { __typename?: 'Mutation' }
  & { createCardAssetOrder?: Maybe<(
    { __typename?: 'WalletOrderTransactionType' }
    & { transaction?: Maybe<(
      { __typename?: 'TransactionType' }
      & Pick<TransactionType, 'id'>
    )>, walletOrder?: Maybe<(
      { __typename?: 'WalletOrderType' }
      & Pick<WalletOrderType, 'id' | 'status' | 'smsNeeded' | 'card2faNeeded'>
    )> }
  )> }
);

export type CreateCardOrderReservationMutationVariables = Exact<{
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrency?: Maybe<Scalars['String']>;
  destinationCurrency?: Maybe<Scalars['String']>;
}>;


export type CreateCardOrderReservationMutation = (
  { __typename?: 'Mutation' }
  & { createCardOrderReservation?: Maybe<(
    { __typename?: 'ReservationType' }
    & Pick<ReservationType, 'reservationId'>
  )> }
);

export type EditCreditCardMutationVariables = Exact<{
  id: Scalars['String'];
  cardBrand?: Maybe<Scalars['String']>;
  tokenizedCardNum?: Maybe<Scalars['String']>;
  tokenizedCVC?: Maybe<Scalars['String']>;
  nameOnCard?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['String']>;
  lastFour?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  streetAdditional?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
}>;


export type EditCreditCardMutation = (
  { __typename?: 'Mutation' }
  & { editPaymentMethod: (
    { __typename?: 'PaymentMethodType' }
    & Pick<PaymentMethodType, 'id'>
  ) }
);

export type EtxDistributionMutationVariables = Exact<{
  product: Scalars['String'];
  amount: Scalars['Float'];
  amountCurrency: Scalars['String'];
  userEmail: Scalars['String'];
  transactionType?: Maybe<Scalars['String']>;
}>;


export type EtxDistributionMutation = (
  { __typename?: 'Mutation' }
  & { etxDistribution?: Maybe<(
    { __typename?: 'EtxDistribution' }
    & Pick<EtxDistribution, 'uuid' | 'product' | 'sourceCurrencyCode' | 'sourceAmount'>
    & { destinationAsset?: Maybe<(
      { __typename?: 'Price' }
      & Pick<Price, 'price'>
    )>, distribution?: Maybe<Array<Maybe<(
      { __typename?: 'DistributedObjectData' }
      & Pick<DistributedObjectData, 'amount' | 'currency'>
    )>>>, depositAddresses?: Maybe<(
      { __typename?: 'DepositAddresses' }
      & Pick<DepositAddresses, 'BTC' | 'ETH' | 'XLM' | 'AVAX' | 'MATIC'>
    )> }
  )> }
);

export type EtxOrderDetailMutationVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type EtxOrderDetailMutation = (
  { __typename?: 'Mutation' }
  & { etxOrderDetail?: Maybe<(
    { __typename?: 'EtxOrderDetail' }
    & { distribution?: Maybe<Array<Maybe<(
      { __typename?: 'OrderPercentageFields' }
      & Pick<OrderPercentageFields, 'currencyCode' | 'percentage' | 'currencyName' | 'image'>
    )>>> }
  )> }
);

export type GetEtxWalletMutationVariables = Exact<{
  notes?: Maybe<Scalars['String']>;
}>;


export type GetEtxWalletMutation = (
  { __typename?: 'Mutation' }
  & { getETXBlocksWallet?: Maybe<(
    { __typename?: 'WalletType' }
    & Pick<WalletType, 'id'>
    & { balances?: Maybe<(
      { __typename?: 'CoinBalanceType' }
      & { totalBalances?: Maybe<Array<Maybe<(
        { __typename?: 'CoinBalance' }
        & Pick<CoinBalance, 'name' | 'balance'>
      )>>>, availableBalances?: Maybe<Array<Maybe<(
        { __typename?: 'CoinBalance' }
        & Pick<CoinBalance, 'name' | 'balance'>
      )>>> }
    )> }
  )> }
);

export type GetPlaidTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlaidTokenQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getToken'>
);

export type PostAuthCodesMutationVariables = Exact<{
  orderId: Scalars['String'];
  reservationId: Scalars['String'];
  sms?: Maybe<Scalars['String']>;
  card2Fa?: Maybe<Scalars['String']>;
}>;


export type PostAuthCodesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'postAuthCodes'>
);

export type RemovePaymentMethodMutationVariables = Exact<{
  id: Scalars['String'];
  type: PaymentMethodCategory;
}>;


export type RemovePaymentMethodMutation = (
  { __typename?: 'Mutation' }
  & { deletePaymentMethod: (
    { __typename?: 'DeletedCardType' }
    & Pick<DeletedCardType, 'message'>
    & { deletedCC?: Maybe<(
      { __typename?: 'PaymentMethodType' }
      & Pick<PaymentMethodType, 'id'>
    )> }
  ) }
);

export type VerifyEmailMutationVariables = Exact<{
  email?: Maybe<Scalars['String']>;
}>;


export type VerifyEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifyEmail'>
);

export type StartAchPurchaseQuoteMutationVariables = Exact<{
  destAmount: Scalars['String'];
  sourceCurrencyCode: Scalars['String'];
  destinationCurrencyCode: Scalars['String'];
  paymentMethodId: Scalars['String'];
}>;


export type StartAchPurchaseQuoteMutation = (
  { __typename?: 'Mutation' }
  & { startACHPurchaseQuote?: Maybe<(
    { __typename?: 'QuoteType' }
    & Pick<QuoteType, 'quoteId'>
  )> }
);

export type StartEtxTransferQuoteMutationVariables = Exact<{
  etxDistributionuuid?: Maybe<Scalars['String']>;
  maxOption?: Maybe<Scalars['Boolean']>;
}>;


export type StartEtxTransferQuoteMutation = (
  { __typename?: 'Mutation' }
  & { startETXTransferQuote?: Maybe<(
    { __typename?: 'ETXTransferQuote' }
    & Pick<EtxTransferQuote, 'transactionId'>
  )> }
);

export type StartEtxWithdrawlTransferQuoteMutationVariables = Exact<{
  etxDistributionuuid?: Maybe<Scalars['String']>;
  maxOption?: Maybe<Scalars['Boolean']>;
}>;


export type StartEtxWithdrawlTransferQuoteMutation = (
  { __typename?: 'Mutation' }
  & { startETXWithdrawlTransferQuote?: Maybe<(
    { __typename?: 'ETXTransferQuote' }
    & Pick<EtxTransferQuote, 'transactionId'>
  )> }
);

export type StartPayoutQuoteMutationVariables = Exact<{
  sourceCurrencyCode?: Maybe<Scalars['String']>;
  destinationCurrencyCode?: Maybe<Scalars['String']>;
  destAmount?: Maybe<Scalars['String']>;
  bankAccountId?: Maybe<Scalars['String']>;
  maxOption?: Maybe<Scalars['Boolean']>;
}>;


export type StartPayoutQuoteMutation = (
  { __typename?: 'Mutation' }
  & { startPayoutQuote?: Maybe<(
    { __typename?: 'QuoteType' }
    & Pick<QuoteType, 'quoteId' | 'sourceCurrency' | 'sourceAmount' | 'sourceCurrencyCode' | 'destinationCurrency' | 'destinationCurrencyCode' | 'destinationAmount' | 'exchangeRate' | 'expiresAt' | 'fiatFees' | 'sourceFee'>
  )> }
);

export type StartQuoteMutationVariables = Exact<{
  destAmount: Scalars['String'];
  sourceCurrencyCode: Scalars['String'];
  destinationCurrencyCode: Scalars['String'];
}>;


export type StartQuoteMutation = (
  { __typename?: 'Mutation' }
  & { startQuote?: Maybe<(
    { __typename?: 'QuoteType' }
    & Pick<QuoteType, 'quoteId'>
  )> }
);

export type StartTransferQuoteMutationVariables = Exact<{
  sourceCurrencyCode?: Maybe<Scalars['String']>;
  destinationCurrencyCode?: Maybe<Scalars['String']>;
  sourceAmount: Scalars['String'];
  externalAddress?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
}>;


export type StartTransferQuoteMutation = (
  { __typename?: 'Mutation' }
  & { startExternalTransferQuote?: Maybe<(
    { __typename?: 'QuoteType' }
    & Pick<QuoteType, 'quoteId'>
  )> }
);

export type StartUserTransferQuoteMutationVariables = Exact<{
  sourceCurrencyCode?: Maybe<Scalars['String']>;
  destAmount?: Maybe<Scalars['String']>;
  sourceAmount: Scalars['String'];
  destinationCurrencyCode?: Maybe<Scalars['String']>;
  destination?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  maxOption?: Maybe<Scalars['Boolean']>;
}>;


export type StartUserTransferQuoteMutation = (
  { __typename?: 'Mutation' }
  & { startUserTransferQuote?: Maybe<(
    { __typename?: 'QuoteType' }
    & Pick<QuoteType, 'quoteId'>
  )> }
);

export type UpdateAccountMutationVariables = Exact<{
  country?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
}>;


export type UpdateAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateAccount?: Maybe<(
    { __typename?: 'AccountType' }
    & Pick<AccountType, 'phone' | 'city'>
    & { country?: Maybe<(
      { __typename?: 'CountryType' }
      & Pick<CountryType, 'name' | 'alpha2'>
    )> }
  )> }
);

export type UpdateStripeBankingMutationVariables = Exact<{
  routingNumber?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
}>;


export type UpdateStripeBankingMutation = (
  { __typename?: 'Mutation' }
  & { updateStripeBanking?: Maybe<(
    { __typename?: 'StripeOutputType' }
    & Pick<StripeOutputType, 'status' | 'verificationRequirements'>
  )> }
);

export type UpdateMerchantProfileMutationVariables = Exact<{
  phoneNumber?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  location?: Maybe<AddressInput>;
  merchantType?: Maybe<Scalars['String']>;
}>;


export type UpdateMerchantProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateMerchantProfile?: Maybe<(
    { __typename?: 'MerchantProfileType' }
    & Pick<MerchantProfileType, 'id' | 'merchantType' | 'displayName' | 'currency' | 'countryCode' | 'acceptsPayments'>
    & { address?: Maybe<(
      { __typename?: 'AddressType' }
      & Pick<AddressType, 'street' | 'streetAdditional' | 'city' | 'region' | 'postal'>
    )> }
  )> }
);

export type UpdateUserProfileMutationVariables = Exact<{
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
}>;


export type UpdateUserProfileMutation = (
  { __typename?: 'Mutation' }
  & { modifyUserProfile?: Maybe<(
    { __typename?: 'AccountType' }
    & Pick<AccountType, 'id'>
  )> }
);

export type UpdateKycInfoMutationVariables = Exact<{
  legalFirstName: Scalars['String'];
  legalLastName: Scalars['String'];
  address: AddressInput;
  individualSsn: Scalars['String'];
  dateOFBirth: BirthdayInput;
  govIdType: GovernmentIdInput;
  govIdFront: Scalars['String'];
  govIdBack?: Maybe<Scalars['String']>;
}>;


export type UpdateKycInfoMutation = (
  { __typename?: 'Mutation' }
  & { enterKYCInfo?: Maybe<(
    { __typename?: 'UploadStatus' }
    & Pick<UploadStatus, 'confirmedUpload' | 'generalError' | 'persistanceError'>
    & { fields?: Maybe<Array<Maybe<(
      { __typename?: 'UploadStatuses' }
      & Pick<UploadStatuses, 'name' | 'status'>
    )>>> }
  )> }
);

export type UpdateStripeAccountMutationVariables = Exact<{
  persons?: Maybe<Array<Maybe<StripeUpdatePersonFieldsInput>> | Maybe<StripeUpdatePersonFieldsInput>>;
  business?: Maybe<StripeUpdateBusinessFieldsInput>;
}>;


export type UpdateStripeAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateStripeAccount'>
);

export type AddBankingInfoMutationVariables = Exact<{
  phoneNumber?: Maybe<Scalars['String']>;
  dob?: Maybe<BirthdayInput>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
  accountType?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  bankAccountNickname?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  routingNumber?: Maybe<Scalars['String']>;
  clabe?: Maybe<Scalars['String']>;
  bsbNumber?: Maybe<Scalars['String']>;
}>;


export type AddBankingInfoMutation = (
  { __typename?: 'Mutation' }
  & { addBankingInfo?: Maybe<(
    { __typename?: 'BankType' }
    & Pick<BankType, 'id' | 'lastFour' | 'nickname' | 'country' | 'accountHolder'>
    & { account?: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, 'id' | 'userName'>
    )> }
  )> }
);

export type ConfirmQuoteMutationVariables = Exact<{
  quoteId?: Maybe<Scalars['String']>;
}>;


export type ConfirmQuoteMutation = (
  { __typename?: 'Mutation' }
  & { confirmQuote?: Maybe<(
    { __typename?: 'ConfirmedQuoteType' }
    & Pick<ConfirmedQuoteType, 'destinationAmount' | 'destinationCurrency' | 'destinationCurrencyCode' | 'transactionId' | 'email'>
  )> }
);

export type DeleteBankMutationVariables = Exact<{
  bankId?: Maybe<Scalars['String']>;
}>;


export type DeleteBankMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBank'>
);

export type GetAccountsByGeomQueryVariables = Exact<{
  geom?: Maybe<GeometricSearchInput>;
}>;


export type GetAccountsByGeomQuery = (
  { __typename?: 'Query' }
  & { searchAccountsByGeom?: Maybe<Array<Maybe<(
    { __typename?: 'AccountType' }
    & Pick<AccountType, 'id' | 'displayName' | 'userName' | 'image'>
    & { merchantProfileDetails?: Maybe<(
      { __typename?: 'MerchantProfileType' }
      & Pick<MerchantProfileType, 'geom' | 'acceptsPayments'>
    )> }
  )>>> }
);

export type GetassethistoryQueryVariables = Exact<{
  assetName?: Maybe<Scalars['String']>;
  period?: Maybe<MarketPeriodInput>;
}>;


export type GetassethistoryQuery = (
  { __typename?: 'Query' }
  & { getAssetHistory?: Maybe<(
    { __typename?: 'SingleAssetHistoryType' }
    & Pick<SingleAssetHistoryType, 'minPrice' | 'maxPrice' | 'firstValidPointIndex' | 'start' | 'end'>
    & { asset?: Maybe<(
      { __typename?: 'AssetType' }
      & Pick<AssetType, 'name' | 'code'>
    )>, history?: Maybe<Array<Maybe<(
      { __typename?: 'AssetHistoryPointType' }
      & Pick<AssetHistoryPointType, 'time' | 'price'>
    )>>> }
  )> }
);

export type GetassetmetricQueryVariables = Exact<{
  assetName?: Maybe<Scalars['String']>;
}>;


export type GetassetmetricQuery = (
  { __typename?: 'Query' }
  & { getAssetMetrics?: Maybe<(
    { __typename?: 'AssetMetricType' }
    & Pick<AssetMetricType, 'name' | 'code' | 'logoImage' | 'price'>
  )> }
);

export type GetMyMerchantProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyMerchantProfileQuery = (
  { __typename?: 'Query' }
  & { myMerchantProfile?: Maybe<(
    { __typename?: 'MerchantProfileType' }
    & Pick<MerchantProfileType, 'id' | 'displayName' | 'merchantType' | 'currency' | 'acceptsPayments' | 'countryCode' | 'payoutsEnabled'>
    & { address?: Maybe<(
      { __typename?: 'AddressType' }
      & Pick<AddressType, 'street' | 'streetAdditional' | 'city' | 'region' | 'postal'>
    )>, country?: Maybe<(
      { __typename?: 'CountryType' }
      & Pick<CountryType, 'name' | 'alpha2'>
    )>, businessDetails?: Maybe<(
      { __typename?: 'BusinessDetailType' }
      & Pick<BusinessDetailType, 'type' | 'hasBanking' | 'hasOnboarded'>
    )> }
  )> }
);

export type GetOrderQueryVariables = Exact<{
  orderId: Scalars['String'];
  merchantId: Scalars['String'];
}>;


export type GetOrderQuery = (
  { __typename?: 'Query' }
  & { paymentMethods: Array<(
    { __typename?: 'PaymentMethodType' }
    & Pick<PaymentMethodType, 'id' | 'name' | 'lastFour' | 'type' | 'expirationDate'>
    & { cardBrand?: Maybe<(
      { __typename?: 'CardBrand' }
      & Pick<CardBrand, 'id' | 'image' | 'display'>
    )> }
  )>, getOrder?: Maybe<(
    { __typename?: 'OrderType' }
    & Pick<OrderType, 'orderId' | 'eventId' | 'paymentEntered' | 'timeRemainingInSecs'>
    & { orderTotal?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'value' | 'display'>
    )>, orderFees?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'value' | 'display'>
    )>, orderSubtotal?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'value' | 'display'>
    )>, tickets?: Maybe<Array<Maybe<(
      { __typename?: 'TicketConfirmationType' }
      & Pick<TicketConfirmationType, 'id' | 'type' | 'quantity'>
      & { subtotalPrice?: Maybe<(
        { __typename?: 'ValueDisplay' }
        & Pick<ValueDisplay, 'value' | 'display' | 'major'>
      )>, price?: Maybe<(
        { __typename?: 'ValueDisplay' }
        & Pick<ValueDisplay, 'value' | 'display' | 'major'>
      )> }
    )>>> }
  )> }
);

export type GetPaymentMethodQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPaymentMethodQuery = (
  { __typename?: 'Query' }
  & { paymentMethod: (
    { __typename?: 'PaymentMethodType' }
    & Pick<PaymentMethodType, 'id' | 'lastFour' | 'type' | 'expirationDate' | 'name' | 'streetAddress' | 'streetAdditional' | 'cityAddress' | 'PostalAddress' | 'country' | 'region'>
    & { cardBrand?: Maybe<(
      { __typename?: 'CardBrand' }
      & Pick<CardBrand, 'id' | 'display' | 'image'>
    )> }
  ) }
);

export type GetTransactionQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTransactionQuery = (
  { __typename?: 'Query' }
  & { transaction?: Maybe<(
    { __typename?: 'TransactionType' }
    & Pick<TransactionType, 'id' | 'dateOfTransaction' | 'amount' | 'currency' | 'txDetail' | 'isRefunded'>
    & { sender?: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, 'id' | 'image' | 'userName' | 'displayName'>
    )>, receiver?: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, 'id' | 'userName' | 'displayName' | 'image'>
    )>, tipAmount?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'major' | 'value' | 'display'>
    )>, total?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'major' | 'value' | 'display'>
    )> }
  )> }
);

export type GetTransactionsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type GetTransactionsQuery = (
  { __typename?: 'Query' }
  & { getTransactions?: Maybe<(
    { __typename?: 'TransactionResultsType' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'currentPage' | 'totalPages' | 'totalCount' | 'perPage'>
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'TransactionType' }
      & Pick<TransactionType, 'id' | 'amount' | 'currency' | 'transactionType' | 'dateOfTransaction'>
      & { origin?: Maybe<(
        { __typename?: 'AccountType' }
        & Pick<AccountType, 'userName'>
      )>, total?: Maybe<(
        { __typename?: 'ValueDisplay' }
        & Pick<ValueDisplay, 'major' | 'value' | 'display'>
      )>, destination?: Maybe<(
        { __typename?: 'AccountType' }
        & Pick<AccountType, 'id' | 'userName' | 'displayName' | 'image'>
      )> }
    )>>> }
  )> }
);

export type GetTransactionsToMeQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type GetTransactionsToMeQuery = (
  { __typename?: 'Query' }
  & { transactionsToMe?: Maybe<(
    { __typename?: 'TransactionResultsType' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'currentPage' | 'totalPages' | 'totalCount' | 'perPage'>
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'TransactionType' }
      & Pick<TransactionType, 'id' | 'amount' | 'currency' | 'transactionType' | 'dateOfTransaction'>
      & { total?: Maybe<(
        { __typename?: 'ValueDisplay' }
        & Pick<ValueDisplay, 'major' | 'value' | 'display'>
      )>, origin?: Maybe<(
        { __typename?: 'AccountType' }
        & Pick<AccountType, 'id' | 'userName' | 'displayName' | 'image'>
      )> }
    )>>> }
  )> }
);

export type GetAchQuoteQueryVariables = Exact<{
  quoteId?: Maybe<Scalars['String']>;
  destinationAssetCode?: Maybe<Scalars['String']>;
}>;


export type GetAchQuoteQuery = (
  { __typename?: 'Query' }
  & { destinationAsset?: Maybe<(
    { __typename?: 'AssetMetricType' }
    & Pick<AssetMetricType, 'price'>
  )>, quote?: Maybe<(
    { __typename?: 'QuoteType' }
    & Pick<QuoteType, 'paymentName' | 'sourceCurrency' | 'sourceCurrencyCode' | 'sourceAmount' | 'destinationCurrency' | 'destinationCurrencyCode' | 'destinationAmount' | 'sourceFee' | 'exchangeRate' | 'notes' | 'logoImage' | 'fiatFees' | 'fiatAmount' | 'fiatCurrencyCode' | 'destination' | 'isInternal'>
  )> }
);

export type GetAccountByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetAccountByIdQuery = (
  { __typename?: 'Query' }
  & { accountById: (
    { __typename?: 'AccountType' }
    & Pick<AccountType, 'userName' | 'hasMultipleAccounts' | 'isMerchant' | 'isPrivate' | 'hasMerchantAccount' | 'displayName' | 'phone' | 'city' | 'kycNeeded' | 'image' | 'id' | 'creationMethod' | 'averageRating'>
    & { kycStatus?: Maybe<(
      { __typename?: 'PlatformMembershipType' }
      & Pick<PlatformMembershipType, 'status' | 'requirements'>
    )>, country?: Maybe<(
      { __typename?: 'CountryType' }
      & Pick<CountryType, 'name' | 'alpha2' | 'currencyCode'>
    )>, qr?: Maybe<(
      { __typename?: 'QRType' }
      & Pick<QrType, 'image' | 'code'>
    )>, merchantProfileDetails?: Maybe<(
      { __typename?: 'MerchantProfileType' }
      & Pick<MerchantProfileType, 'id' | 'acceptsPayments' | 'payoutsEnabled' | 'capabilities' | 'currency' | 'geom' | 'merchantType' | 'status'>
      & { address?: Maybe<(
        { __typename?: 'AddressType' }
        & Pick<AddressType, 'street' | 'streetAdditional' | 'city' | 'region' | 'postal'>
      )>, country?: Maybe<(
        { __typename?: 'CountryType' }
        & Pick<CountryType, 'name' | 'alpha2'>
      )>, businessDetails?: Maybe<(
        { __typename?: 'BusinessDetailType' }
        & Pick<BusinessDetailType, 'type' | 'hasBanking' | 'hasOnboarded' | 'chargesEnabled' | 'payoutsEnabled' | 'pastDueRequirements' | 'currentlyDueRequirements' | 'requirementsDueDate'>
      )> }
    )>, reviews?: Maybe<(
      { __typename?: 'ReviewResultsType' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'totalCount'>
      ) }
    )>, transactions?: Maybe<(
      { __typename?: 'TransactionResultsType' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'totalCount'>
      ) }
    )> }
  ) }
);

export type GetAllArticlesQueryVariables = Exact<{
  ticker?: Maybe<Scalars['String']>;
}>;


export type GetAllArticlesQuery = (
  { __typename?: 'Query' }
  & { allArticles?: Maybe<Array<Maybe<(
    { __typename?: 'NewsType' }
    & Pick<NewsType, 'title' | 'url' | 'text' | 'sourceName' | 'tickers' | 'topics' | 'imageUrl'>
    & { createdOn?: Maybe<(
      { __typename?: 'DateOfCreation' }
      & Pick<DateOfCreation, 'date'>
    )> }
  )>>> }
);

export type GetAllPortfolioQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPortfolioQuery = (
  { __typename?: 'Query' }
  & { getetxPortfolio?: Maybe<(
    { __typename?: 'EtxReBalancingPortfolio' }
    & Pick<EtxReBalancingPortfolio, 'totalFiatBalance' | 'fiatCurrencyCode' | 'lastRebalancingOn'>
    & { portfolio?: Maybe<Array<Maybe<(
      { __typename?: 'CurrencyPortFolio' }
      & Pick<CurrencyPortFolio, 'logoImage' | 'cryptoAmount' | 'currencyName' | 'currency' | 'fiatAmount' | 'fiatCurrency' | 'amountPer'>
    )>>> }
  )> }
);

export type GetAvailablePaymentProvidersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAvailablePaymentProvidersQuery = (
  { __typename?: 'Query' }
  & { availableProviders?: Maybe<Array<Maybe<(
    { __typename?: 'ProvidersType' }
    & Pick<ProvidersType, 'provider' | 'available'>
  )>>> }
);

export type GetBlocksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlocksQuery = (
  { __typename?: 'Query' }
  & { getBlocks?: Maybe<(
    { __typename?: 'BlocksType' }
    & { blocks?: Maybe<Array<Maybe<(
      { __typename?: 'BlockType' }
      & Pick<BlockType, 'threeMonth' | 'sixMonth' | 'twelveMonth' | 'name' | 'link'>
    )>>> }
  )> }
);

export type GetCarouselItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarouselItemsQuery = (
  { __typename?: 'Query' }
  & { getCarouselAssets?: Maybe<Array<Maybe<(
    { __typename?: 'CarouselType' }
    & Pick<CarouselType, 'type' | 'src' | 'content' | 'link' | 'poster'>
  )>>> }
);

export type GetCoinSwapAssetsQueryVariables = Exact<{
  quoteId?: Maybe<Scalars['String']>;
  sourceAssetCode?: Maybe<Scalars['String']>;
  destinationAssetCode?: Maybe<Scalars['String']>;
}>;


export type GetCoinSwapAssetsQuery = (
  { __typename?: 'Query' }
  & { sourceAsset?: Maybe<(
    { __typename?: 'AssetMetricType' }
    & Pick<AssetMetricType, 'price'>
  )>, destinationAsset?: Maybe<(
    { __typename?: 'AssetMetricType' }
    & Pick<AssetMetricType, 'price'>
  )>, quote?: Maybe<(
    { __typename?: 'QuoteType' }
    & Pick<QuoteType, 'sourceCurrency' | 'sourceCurrencyCode' | 'sourceAmount' | 'destinationCurrency' | 'destinationCurrencyCode' | 'destinationAmount' | 'sourceFee' | 'fiatCurrencyCode'>
  )> }
);

export type GetCryptoAssetMetricsQueryVariables = Exact<{
  assetName: Scalars['String'];
}>;


export type GetCryptoAssetMetricsQuery = (
  { __typename?: 'Query' }
  & { getAssetMetrics?: Maybe<(
    { __typename?: 'AssetMetricType' }
    & Pick<AssetMetricType, 'name' | 'code' | 'price' | 'currency' | 'logoImage'>
  )> }
);

export type GetCryptoBuySuccessDataQueryVariables = Exact<{
  orderId?: Maybe<Scalars['String']>;
  assetCode?: Maybe<Scalars['String']>;
}>;


export type GetCryptoBuySuccessDataQuery = (
  { __typename?: 'Query' }
  & { asset?: Maybe<(
    { __typename?: 'AssetMetricType' }
    & Pick<AssetMetricType, 'name' | 'logoImage'>
  )>, order?: Maybe<(
    { __typename?: 'WalletOrderType' }
    & Pick<WalletOrderType, 'purchaseAmount' | 'destinationAmount' | 'sourceCurrency'>
  )> }
);

export type GetCryptoCardOrderReservationQueryVariables = Exact<{
  reservationId?: Maybe<Scalars['String']>;
  paymentMethodId?: Maybe<Scalars['String']>;
  assetCode?: Maybe<Scalars['String']>;
}>;


export type GetCryptoCardOrderReservationQuery = (
  { __typename?: 'Query' }
  & { asset?: Maybe<(
    { __typename?: 'AssetMetricType' }
    & Pick<AssetMetricType, 'price'>
  )>, paymentMethod: (
    { __typename?: 'PaymentMethodType' }
    & Pick<PaymentMethodType, 'id' | 'lastFour'>
    & { cardBrand?: Maybe<(
      { __typename?: 'CardBrand' }
      & Pick<CardBrand, 'id' | 'display' | 'image'>
    )> }
  ), reservation?: Maybe<(
    { __typename?: 'ReservationType' }
    & Pick<ReservationType, 'reservationId' | 'exchangeRate' | 'sourceAmount' | 'sourceCurrency' | 'destinationCurrency' | 'destinationAmount'>
    & { fees?: Maybe<Array<Maybe<(
      { __typename?: 'QuoteFees' }
      & Pick<QuoteFees, 'currencyName' | 'feeAmount'>
    )>>> }
  )> }
);

export type GetCryptoMarketListQueryVariables = Exact<{
  interestOnly?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
}>;


export type GetCryptoMarketListQuery = (
  { __typename?: 'Query' }
  & { getMarketList?: Maybe<(
    { __typename?: 'AssetMarketMetricList' }
    & { assets?: Maybe<Array<Maybe<(
      { __typename?: 'AssetMetricType' }
      & Pick<AssetMetricType, 'name' | 'code' | 'price' | 'currency' | 'logoImage' | 'percentChangeOverPeriod'>
    )>>> }
  )> }
);

export type GetCryptoPurchaseMethodsQueryVariables = Exact<{
  purchaseAmount?: Maybe<Scalars['String']>;
  purchaseCurrency?: Maybe<Scalars['String']>;
}>;


export type GetCryptoPurchaseMethodsQuery = (
  { __typename?: 'Query' }
  & { assets?: Maybe<Array<Maybe<(
    { __typename?: 'AssetBalanceType' }
    & Pick<AssetBalanceType, 'name' | 'code' | 'logoImage' | 'amount'>
    & { fiatAmount?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'value' | 'major' | 'display'>
    )> }
  )>>>, cards: Array<(
    { __typename?: 'PaymentMethodType' }
    & Pick<PaymentMethodType, 'id' | 'name' | 'lastFour' | 'region' | 'type' | 'expirationDate'>
    & { cardBrand?: Maybe<(
      { __typename?: 'CardBrand' }
      & Pick<CardBrand, 'id' | 'image' | 'display'>
    )> }
  )>, banks: Array<(
    { __typename?: 'PaymentMethodType' }
    & Pick<PaymentMethodType, 'id' | 'name' | 'type' | 'lastFour' | 'region' | 'status'>
    & { cardBrand?: Maybe<(
      { __typename?: 'CardBrand' }
      & Pick<CardBrand, 'id' | 'image' | 'display'>
    )> }
  )> }
);

export type GetRecentCryptoTransactionsQueryVariables = Exact<{
  seeAll?: Maybe<Scalars['Boolean']>;
  transactionCategory?: Maybe<Scalars['String']>;
  asset?: Maybe<Scalars['String']>;
}>;


export type GetRecentCryptoTransactionsQuery = (
  { __typename?: 'Query' }
  & { getRecentTransactions?: Maybe<Array<Maybe<(
    { __typename?: 'AssetTransactionType' }
    & Pick<AssetTransactionType, 'asset' | 'amount' | 'date' | 'category' | 'fiatCurrency' | 'status' | 'assetName' | 'swappedAsset' | 'swappedAssetName'>
    & { coin?: Maybe<(
      { __typename?: 'AssetType' }
      & Pick<AssetType, 'name' | 'logoImage' | 'code'>
    )>, fiatAmount?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'display' | 'major'>
    )>, receiver?: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, 'id' | 'userName' | 'displayName' | 'image'>
    )>, sender?: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, 'id' | 'userName' | 'displayName' | 'image'>
    )> }
  )>>> }
);

export type GetEtxHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEtxHistoryQuery = (
  { __typename?: 'Query' }
  & { getEtxHistory?: Maybe<(
    { __typename?: 'EtxType' }
    & Pick<EtxType, 'Month' | 'sixMonth' | 'twelveMonth'>
  )> }
);

export type GetEtxProductQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEtxProductQuery = (
  { __typename?: 'Query' }
  & { getEtxProduct?: Maybe<(
    { __typename?: 'EtxProductList' }
    & Pick<EtxProductList, 'name' | 'etxKey' | 'logoImage'>
    & { distribution?: Maybe<Array<Maybe<(
      { __typename?: 'DistributionCurrency' }
      & Pick<DistributionCurrency, 'name' | 'code' | 'image' | 'percentage'>
    )>>> }
  )> }
);

export type GetEventQueryVariables = Exact<{
  merchantId?: Maybe<Scalars['String']>;
  platformEventId?: Maybe<Scalars['String']>;
  venuePlatformId?: Maybe<Scalars['String']>;
}>;


export type GetEventQuery = (
  { __typename?: 'Query' }
  & { getEvent?: Maybe<(
    { __typename?: 'EventDetailType' }
    & { eventInfo: (
      { __typename?: 'EventType' }
      & Pick<EventType, 'id' | 'title' | 'dateTime' | 'description' | 'artists' | 'type' | 'isOnline' | 'imageUrl'>
    ), ticketDetails: Array<(
      { __typename?: 'TicketDetailsType' }
      & Pick<TicketDetailsType, 'id' | 'type' | 'currency' | 'status' | 'minimumPerOrder' | 'maximumPerOrder' | 'saleStart' | 'saleEnd'>
      & { price?: Maybe<(
        { __typename?: 'ValueDisplay' }
        & Pick<ValueDisplay, 'value' | 'display' | 'major'>
      )> }
    )> }
  )> }
);

export type GetFeaturesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeaturesQuery = (
  { __typename?: 'Query' }
  & { features?: Maybe<(
    { __typename?: 'FeaturesType' }
    & { features?: Maybe<Array<Maybe<(
      { __typename?: 'FeatureType' }
      & Pick<FeatureType, 'id' | 'name' | 'description' | 'enabled'>
    )>>> }
  )> }
);

export type GetMatchingEngineCreditCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMatchingEngineCreditCardsQuery = (
  { __typename?: 'Query' }
  & { matchingEngineCards?: Maybe<Array<Maybe<(
    { __typename?: 'MatchingEngineType' }
    & Pick<MatchingEngineType, 'name' | 'image' | 'link'>
  )>>> }
);

export type GetMatchingEngineLendersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMatchingEngineLendersQuery = (
  { __typename?: 'Query' }
  & { matchingEngineLenders?: Maybe<Array<Maybe<(
    { __typename?: 'MatchingEngineType' }
    & Pick<MatchingEngineType, 'name' | 'image' | 'link'>
  )>>> }
);

export type GetMissingStripeRequirementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMissingStripeRequirementsQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'AccountType' }
    & { merchantProfileDetails?: Maybe<(
      { __typename?: 'MerchantProfileType' }
      & Pick<MerchantProfileType, 'countryCode'>
    )> }
  ), missingStripeRequirements?: Maybe<(
    { __typename?: 'MissingStripeRequirementsType' }
    & { persons?: Maybe<Array<Maybe<(
      { __typename?: 'MissingStripePersonFieldsType' }
      & Pick<MissingStripePersonFieldsType, 'id' | 'name' | 'relationships'>
      & { missingFields?: Maybe<Array<Maybe<(
        { __typename?: 'MissingStripeField' }
        & Pick<MissingStripeField, 'fieldName' | 'properties'>
      )>>> }
    )>>>, business?: Maybe<(
      { __typename?: 'MissingStripeBusinessFieldsType' }
      & Pick<MissingStripeBusinessFieldsType, 'id' | 'name' | 'type'>
      & { missingFields?: Maybe<Array<Maybe<(
        { __typename?: 'MissingStripeField' }
        & Pick<MissingStripeField, 'fieldName' | 'properties'>
      )>>> }
    )> }
  )> }
);

export type GetMyAssetAddressQueryVariables = Exact<{
  asset?: Maybe<Scalars['String']>;
}>;


export type GetMyAssetAddressQuery = (
  { __typename?: 'Query' }
  & { myAssetAddress?: Maybe<(
    { __typename?: 'CryptoAddressQRType' }
    & Pick<CryptoAddressQrType, 'code' | 'image'>
  )> }
);

export type GetMyAssetInterestRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyAssetInterestRatesQuery = (
  { __typename?: 'Query' }
  & { myAssetInterestRates?: Maybe<Array<Maybe<(
    { __typename?: 'AssetInterestRateType' }
    & Pick<AssetInterestRateType, 'code' | 'name' | 'logoImage' | 'interestRate'>
  )>>> }
);

export type MyAssetsQueryVariables = Exact<{
  currency: Scalars['String'];
  type?: Maybe<Scalars['String']>;
}>;


export type MyAssetsQuery = (
  { __typename?: 'Query' }
  & { myAssets?: Maybe<Array<Maybe<(
    { __typename?: 'AssetBalanceType' }
    & Pick<AssetBalanceType, 'name' | 'code' | 'logoImage' | 'amount' | 'interestGaining' | 'exchangeRate'>
    & { fiatAmount?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'value' | 'display' | 'major'>
    )> }
  )>>> }
);

export type GetMyAssetsAndMetricsQueryVariables = Exact<{
  assetName: Scalars['String'];
  currency: Scalars['String'];
}>;


export type GetMyAssetsAndMetricsQuery = (
  { __typename?: 'Query' }
  & { myAssets?: Maybe<Array<Maybe<(
    { __typename?: 'AssetBalanceType' }
    & Pick<AssetBalanceType, 'code' | 'amount'>
    & { fiatAmount?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'value' | 'major' | 'display'>
    )> }
  )>>>, getAssetMetrics?: Maybe<(
    { __typename?: 'AssetMetricType' }
    & Pick<AssetMetricType, 'name' | 'code' | 'price' | 'currency' | 'logoImage'>
  )> }
);

export type GetMyAssetsInterestSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyAssetsInterestSummaryQuery = (
  { __typename?: 'Query' }
  & { myAssetsInterestSummary?: Maybe<(
    { __typename?: 'AssetInterestSummaryType' }
    & Pick<AssetInterestSummaryType, 'totalInterestGained'>
    & { totalInterestGainedFiat?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'major'>
    )>, assets?: Maybe<Array<Maybe<(
      { __typename?: 'AssetInterestGainedType' }
      & Pick<AssetInterestGainedType, 'name' | 'code' | 'logoImage' | 'interestGained'>
      & { interestGainedFiat?: Maybe<(
        { __typename?: 'ValueDisplay' }
        & Pick<ValueDisplay, 'major'>
      )> }
    )>>> }
  )> }
);

export type GetMyMerchantBusinessDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyMerchantBusinessDetailsQuery = (
  { __typename?: 'Query' }
  & { myMerchantProfile?: Maybe<(
    { __typename?: 'MerchantProfileType' }
    & Pick<MerchantProfileType, 'acceptsPayments' | 'id'>
    & { businessDetails?: Maybe<(
      { __typename?: 'BusinessDetailType' }
      & Pick<BusinessDetailType, 'type' | 'hasBanking' | 'hasOnboarded'>
    )> }
  )> }
);

export type GetMyPaymentMethodsQueryVariables = Exact<{
  paymentMethodCategory?: Maybe<PaymentMethodCategory>;
}>;


export type GetMyPaymentMethodsQuery = (
  { __typename?: 'Query' }
  & { paymentMethods: Array<(
    { __typename?: 'PaymentMethodType' }
    & Pick<PaymentMethodType, 'id' | 'name' | 'lastFour' | 'expirationDate' | 'status' | 'type'>
    & { cardBrand?: Maybe<(
      { __typename?: 'CardBrand' }
      & Pick<CardBrand, 'display' | 'image'>
    )> }
  )> }
);

export type GetPayoutSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPayoutSummaryQuery = (
  { __typename?: 'Query' }
  & { getPayoutSummary?: Maybe<(
    { __typename?: 'PayoutSummaryType' }
    & Pick<PayoutSummaryType, 'currency' | 'currentBalance' | 'pendingBalance'>
    & { payoutHistory?: Maybe<Array<(
      { __typename?: 'PayoutItemType' }
      & Pick<PayoutItemType, 'date' | 'status'>
      & { amount?: Maybe<(
        { __typename?: 'ValueDisplay' }
        & Pick<ValueDisplay, 'value' | 'display' | 'major'>
      )> }
    )>>, available?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'value' | 'display' | 'major'>
    )>, pending?: Maybe<(
      { __typename?: 'ValueDisplay' }
      & Pick<ValueDisplay, 'value' | 'display' | 'major'>
    )> }
  )> }
);

export type GetQuoteAndAssetQueryVariables = Exact<{
  quoteId?: Maybe<Scalars['String']>;
  assetCode?: Maybe<Scalars['String']>;
}>;


export type GetQuoteAndAssetQuery = (
  { __typename?: 'Query' }
  & { asset?: Maybe<(
    { __typename?: 'AssetMetricType' }
    & Pick<AssetMetricType, 'price' | 'logoImage'>
  )>, quote?: Maybe<(
    { __typename?: 'QuoteType' }
    & Pick<QuoteType, 'sourceCurrency' | 'sourceCurrencyCode' | 'sourceAmount' | 'destinationCurrency' | 'destinationCurrencyCode' | 'destinationAmount' | 'sourceFee' | 'fiatCurrencyCode'>
  )> }
);

export type GetQuoteByIdQueryVariables = Exact<{
  quoteId?: Maybe<Scalars['String']>;
  assetCode?: Maybe<Scalars['String']>;
}>;


export type GetQuoteByIdQuery = (
  { __typename?: 'Query' }
  & { getQuote?: Maybe<(
    { __typename?: 'QuoteType' }
    & Pick<QuoteType, 'paymentName' | 'sourceCurrency' | 'sourceCurrencyCode' | 'sourceAmount' | 'destinationCurrency' | 'destinationCurrencyCode' | 'destinationAmount' | 'sourceFee' | 'notes' | 'fiatFees' | 'fiatAmount' | 'fiatCurrencyCode' | 'destination' | 'isInternal'>
  )> }
);

export type GetRecentlyTransactedWithQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentlyTransactedWithQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'AccountType' }
    & { recentlyTransactedWith?: Maybe<Array<Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, 'id' | 'image' | 'userName' | 'displayName'>
    )>>> }
  ) }
);

export type GetReviewsByAccountIdQueryVariables = Exact<{
  merchantId: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type GetReviewsByAccountIdQuery = (
  { __typename?: 'Query' }
  & { reviews: (
    { __typename?: 'ReviewResultsType' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'ReviewType' }
      & Pick<ReviewType, 'id' | 'date' | 'detail' | 'averageRating' | 'rating'>
      & { transaction?: Maybe<(
        { __typename?: 'TransactionType' }
        & { sender?: Maybe<(
          { __typename?: 'AccountType' }
          & Pick<AccountType, 'displayName' | 'userName' | 'image'>
        )> }
      )> }
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'currentPage' | 'totalCount' | 'perPage'>
    ) }
  ) }
);

export type GetVenueByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetVenueByIdQuery = (
  { __typename?: 'Query' }
  & { getVenueById?: Maybe<(
    { __typename?: 'VenueType' }
    & Pick<VenueType, 'platformId'>
    & { merchant?: Maybe<(
      { __typename?: 'MerchantProfileType' }
      & Pick<MerchantProfileType, 'id' | 'displayName'>
      & { address?: Maybe<(
        { __typename?: 'AddressType' }
        & Pick<AddressType, 'street' | 'streetAdditional' | 'city' | 'region' | 'postal'>
      )> }
    )>, venueEvents?: Maybe<(
      { __typename?: 'VenueEventsType' }
      & { events?: Maybe<Array<Maybe<(
        { __typename?: 'EventSummaryType' }
        & { eventInfo: (
          { __typename?: 'EventType' }
          & Pick<EventType, 'id' | 'title' | 'imageUrl' | 'dateTime'>
        ) }
      )>>> }
    )> }
  )> }
);

export type GetWalletBalanceHistoryQueryVariables = Exact<{
  period?: Maybe<MarketPeriodInput>;
}>;


export type GetWalletBalanceHistoryQuery = (
  { __typename?: 'Query' }
  & { getWalletBalanceHistory?: Maybe<(
    { __typename?: 'AssetBalanceHistoryType' }
    & Pick<AssetBalanceHistoryType, 'totalFiatBalance' | 'start' | 'end' | 'minPrice' | 'maxPrice' | 'firstValidPointIndex'>
    & { history?: Maybe<Array<Maybe<(
      { __typename?: 'AssetHistoryPointType' }
      & Pick<AssetHistoryPointType, 'price' | 'time'>
    )>>> }
  )> }
);

export type MyAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAccountsQuery = (
  { __typename?: 'Query' }
  & { accounts?: Maybe<Array<Maybe<(
    { __typename?: 'AccountType' }
    & Pick<AccountType, 'image' | 'displayName' | 'userName' | 'id'>
  )>>> }
);

export type MyUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyUserProfileQuery = (
  { __typename?: 'Query' }
  & { myUserProfile?: Maybe<(
    { __typename?: 'UserType' }
    & Pick<UserType, 'firstName' | 'lastName' | 'fullName' | 'createdOn'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'AccountType' }
    & Pick<AccountType, 'userName' | 'hasMultipleAccounts' | 'hasMerchantAccount' | 'isMerchant' | 'displayName' | 'image' | 'id' | 'city' | 'isPrivate' | 'phone'>
    & { country?: Maybe<(
      { __typename?: 'CountryType' }
      & Pick<CountryType, 'name' | 'alpha2' | 'currencyCode'>
    )>, qr?: Maybe<(
      { __typename?: 'QRType' }
      & Pick<QrType, 'image' | 'code'>
    )>, merchantProfileDetails?: Maybe<(
      { __typename?: 'MerchantProfileType' }
      & Pick<MerchantProfileType, 'id' | 'merchantType' | 'displayName' | 'status' | 'currency' | 'countryCode' | 'acceptsPayments' | 'payoutsEnabled' | 'capabilities' | 'geom'>
      & { address?: Maybe<(
        { __typename?: 'AddressType' }
        & Pick<AddressType, 'street' | 'streetAdditional' | 'city' | 'region' | 'postal'>
      )>, country?: Maybe<(
        { __typename?: 'CountryType' }
        & Pick<CountryType, 'name' | 'alpha2'>
      )> }
    )>, recentlyTransactedWith?: Maybe<Array<Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, 'id' | 'userName' | 'displayName' | 'image'>
    )>>> }
  ) }
);

export type SearchAccountsQueryVariables = Exact<{
  search: Scalars['String'];
  isMerchant?: Maybe<Scalars['Boolean']>;
}>;


export type SearchAccountsQuery = (
  { __typename?: 'Query' }
  & { searchAccounts?: Maybe<Array<Maybe<(
    { __typename?: 'AccountType' }
    & Pick<AccountType, 'id' | 'userName' | 'displayName' | 'image' | 'isMerchant'>
  )>>> }
);

export type IsUsernameAvailableQueryVariables = Exact<{
  keyword: Scalars['String'];
}>;


export type IsUsernameAvailableQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isUsernameAvailable'>
);

export type GetBanksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBanksQuery = (
  { __typename?: 'Query' }
  & { getBanks?: Maybe<Array<Maybe<(
    { __typename?: 'BankType' }
    & Pick<BankType, 'id' | 'lastFour' | 'nickname' | 'country' | 'accountHolder'>
    & { account?: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, 'userName' | 'id'>
    )> }
  )>>> }
);

export type GetMarketListQueryVariables = Exact<{
  period?: Maybe<MarketPeriodInput>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type GetMarketListQuery = (
  { __typename?: 'Query' }
  & { getMarketList?: Maybe<(
    { __typename?: 'AssetMarketMetricList' }
    & { assets?: Maybe<Array<Maybe<(
      { __typename?: 'AssetMetricType' }
      & Pick<AssetMetricType, 'currency' | 'name' | 'code' | 'logoImage' | 'price' | 'percentChangeOverPeriod'>
    )>>> }
  )> }
);

export type GetMarketTopMoversListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMarketTopMoversListQuery = (
  { __typename?: 'Query' }
  & { getMarketList?: Maybe<(
    { __typename?: 'AssetMarketMetricList' }
    & { assets?: Maybe<Array<Maybe<(
      { __typename?: 'AssetMetricType' }
      & Pick<AssetMetricType, 'currency' | 'name' | 'code' | 'logoImage' | 'price' | 'percentChangeOverPeriod'>
    )>>> }
  )> }
);

export type SearchForUserContactsQueryVariables = Exact<{
  contacts?: Maybe<Array<Maybe<ContactInput>> | Maybe<ContactInput>>;
}>;


export type SearchForUserContactsQuery = (
  { __typename?: 'Query' }
  & { searchForUserContacts?: Maybe<Array<Maybe<(
    { __typename?: 'AccountType' }
    & Pick<AccountType, 'id' | 'userName' | 'displayName' | 'image' | 'isMerchant'>
  )>>> }
);

export type GetWalletQueryVariables = Exact<{
  type?: Maybe<Scalars['String']>;
}>;


export type GetWalletQuery = (
  { __typename?: 'Query' }
  & { wallet?: Maybe<(
    { __typename?: 'WalletType' }
    & Pick<WalletType, 'id'>
    & { assets?: Maybe<Array<Maybe<(
      { __typename?: 'AssetBalanceType' }
      & Pick<AssetBalanceType, 'name' | 'code' | 'amount' | 'logoImage' | 'currency' | 'interestGaining' | 'exchangeRate'>
      & { fiatAmount?: Maybe<(
        { __typename?: 'ValueDisplay' }
        & Pick<ValueDisplay, 'value' | 'display' | 'major'>
      )> }
    )>>> }
  )> }
);


export const AddCreditCardDocument = gql`
    mutation AddCreditCard($cardBrand: String!, $tokenizedCardNum: String!, $tokenizedCVC: String!, $nameOnCard: String!, $expirationDate: String!, $lastFour: String!, $street: String!, $streetAdditional: String!, $city: String!, $postal: String!, $region: String!, $country: String!) {
  createPaymentMethod(
    cardBrand: $cardBrand
    tokenizedCardNum: $tokenizedCardNum
    tokenizedCVC: $tokenizedCVC
    nameOnCard: $nameOnCard
    expirationDate: $expirationDate
    lastFour: $lastFour
    street: $street
    streetAdditional: $streetAdditional
    city: $city
    postal: $postal
    region: $region
    country: $country
  ) {
    id
    lastFour
    cardBrand {
      id
      display
      image
    }
    status
    type
    expirationDate
    name
  }
}
    `;
export type AddCreditCardMutationFn = Apollo.MutationFunction<AddCreditCardMutation, AddCreditCardMutationVariables>;

/**
 * __useAddCreditCardMutation__
 *
 * To run a mutation, you first call `useAddCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCreditCardMutation, { data, loading, error }] = useAddCreditCardMutation({
 *   variables: {
 *      cardBrand: // value for 'cardBrand'
 *      tokenizedCardNum: // value for 'tokenizedCardNum'
 *      tokenizedCVC: // value for 'tokenizedCVC'
 *      nameOnCard: // value for 'nameOnCard'
 *      expirationDate: // value for 'expirationDate'
 *      lastFour: // value for 'lastFour'
 *      street: // value for 'street'
 *      streetAdditional: // value for 'streetAdditional'
 *      city: // value for 'city'
 *      postal: // value for 'postal'
 *      region: // value for 'region'
 *      country: // value for 'country'
 *   },
 * });
 */
export function useAddCreditCardMutation(baseOptions?: Apollo.MutationHookOptions<AddCreditCardMutation, AddCreditCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCreditCardMutation, AddCreditCardMutationVariables>(AddCreditCardDocument, options);
      }
export type AddCreditCardMutationHookResult = ReturnType<typeof useAddCreditCardMutation>;
export type AddCreditCardMutationResult = Apollo.MutationResult<AddCreditCardMutation>;
export type AddCreditCardMutationOptions = Apollo.BaseMutationOptions<AddCreditCardMutation, AddCreditCardMutationVariables>;
export const UpdateAccountImageDocument = gql`
    mutation UpdateAccountImage($image: String, $dimensions: ImageDimensions) {
  updateAccountImage(image: $image, dimensions: $dimensions) {
    image
  }
}
    `;
export type UpdateAccountImageMutationFn = Apollo.MutationFunction<UpdateAccountImageMutation, UpdateAccountImageMutationVariables>;

/**
 * __useUpdateAccountImageMutation__
 *
 * To run a mutation, you first call `useUpdateAccountImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountImageMutation, { data, loading, error }] = useUpdateAccountImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *      dimensions: // value for 'dimensions'
 *   },
 * });
 */
export function useUpdateAccountImageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountImageMutation, UpdateAccountImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountImageMutation, UpdateAccountImageMutationVariables>(UpdateAccountImageDocument, options);
      }
export type UpdateAccountImageMutationHookResult = ReturnType<typeof useUpdateAccountImageMutation>;
export type UpdateAccountImageMutationResult = Apollo.MutationResult<UpdateAccountImageMutation>;
export type UpdateAccountImageMutationOptions = Apollo.BaseMutationOptions<UpdateAccountImageMutation, UpdateAccountImageMutationVariables>;
export const CompleteTicketOrderWithPaymentDocument = gql`
    mutation CompleteTicketOrderWithPayment($orderId: String, $eventId: String, $merchantId: String, $payMethodId: String, $postal: String, $cvv: String) {
  completeTicketOrderWithPayment(
    orderId: $orderId
    eventId: $eventId
    merchantId: $merchantId
    payMethodId: $payMethodId
    cvvConfirmation: $cvv
    postal: $postal
  ) {
    successMessage
  }
}
    `;
export type CompleteTicketOrderWithPaymentMutationFn = Apollo.MutationFunction<CompleteTicketOrderWithPaymentMutation, CompleteTicketOrderWithPaymentMutationVariables>;

/**
 * __useCompleteTicketOrderWithPaymentMutation__
 *
 * To run a mutation, you first call `useCompleteTicketOrderWithPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteTicketOrderWithPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeTicketOrderWithPaymentMutation, { data, loading, error }] = useCompleteTicketOrderWithPaymentMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      eventId: // value for 'eventId'
 *      merchantId: // value for 'merchantId'
 *      payMethodId: // value for 'payMethodId'
 *      postal: // value for 'postal'
 *      cvv: // value for 'cvv'
 *   },
 * });
 */
export function useCompleteTicketOrderWithPaymentMutation(baseOptions?: Apollo.MutationHookOptions<CompleteTicketOrderWithPaymentMutation, CompleteTicketOrderWithPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteTicketOrderWithPaymentMutation, CompleteTicketOrderWithPaymentMutationVariables>(CompleteTicketOrderWithPaymentDocument, options);
      }
export type CompleteTicketOrderWithPaymentMutationHookResult = ReturnType<typeof useCompleteTicketOrderWithPaymentMutation>;
export type CompleteTicketOrderWithPaymentMutationResult = Apollo.MutationResult<CompleteTicketOrderWithPaymentMutation>;
export type CompleteTicketOrderWithPaymentMutationOptions = Apollo.BaseMutationOptions<CompleteTicketOrderWithPaymentMutation, CompleteTicketOrderWithPaymentMutationVariables>;
export const CreateCompanyStripeAccountDocument = gql`
    mutation createCompanyStripeAccount($legalName: String, $taxId: String, $email: String, $address: AddressInput, $phone: String, $website: String, $businessDescription: String, $structure: String, $persons: [StripePersonInput]) {
  createCompanyStripeAccount(
    legalName: $legalName
    taxId: $taxId
    email: $email
    address: $address
    phone: $phone
    website: $website
    businessDescription: $businessDescription
    structure: $structure
    persons: $persons
  )
}
    `;
export type CreateCompanyStripeAccountMutationFn = Apollo.MutationFunction<CreateCompanyStripeAccountMutation, CreateCompanyStripeAccountMutationVariables>;

/**
 * __useCreateCompanyStripeAccountMutation__
 *
 * To run a mutation, you first call `useCreateCompanyStripeAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyStripeAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyStripeAccountMutation, { data, loading, error }] = useCreateCompanyStripeAccountMutation({
 *   variables: {
 *      legalName: // value for 'legalName'
 *      taxId: // value for 'taxId'
 *      email: // value for 'email'
 *      address: // value for 'address'
 *      phone: // value for 'phone'
 *      website: // value for 'website'
 *      businessDescription: // value for 'businessDescription'
 *      structure: // value for 'structure'
 *      persons: // value for 'persons'
 *   },
 * });
 */
export function useCreateCompanyStripeAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyStripeAccountMutation, CreateCompanyStripeAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanyStripeAccountMutation, CreateCompanyStripeAccountMutationVariables>(CreateCompanyStripeAccountDocument, options);
      }
export type CreateCompanyStripeAccountMutationHookResult = ReturnType<typeof useCreateCompanyStripeAccountMutation>;
export type CreateCompanyStripeAccountMutationResult = Apollo.MutationResult<CreateCompanyStripeAccountMutation>;
export type CreateCompanyStripeAccountMutationOptions = Apollo.BaseMutationOptions<CreateCompanyStripeAccountMutation, CreateCompanyStripeAccountMutationVariables>;
export const CreateCompleteTransactionDocument = gql`
    mutation createCompleteTransaction($tip: Int!, $amount: Int!, $subtotal: Int!, $currency: String!, $destinationAccountTag: String!, $methodUsed: String!) {
  createCompleteTransaction(
    tip: $tip
    amount: $amount
    subtotal: $subtotal
    currency: $currency
    destinationAccountTag: $destinationAccountTag
    methodUsed: $methodUsed
  ) {
    transaction {
      id
      amount
      transactionType
    }
    intentSecret
  }
}
    `;
export type CreateCompleteTransactionMutationFn = Apollo.MutationFunction<CreateCompleteTransactionMutation, CreateCompleteTransactionMutationVariables>;

/**
 * __useCreateCompleteTransactionMutation__
 *
 * To run a mutation, you first call `useCreateCompleteTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompleteTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompleteTransactionMutation, { data, loading, error }] = useCreateCompleteTransactionMutation({
 *   variables: {
 *      tip: // value for 'tip'
 *      amount: // value for 'amount'
 *      subtotal: // value for 'subtotal'
 *      currency: // value for 'currency'
 *      destinationAccountTag: // value for 'destinationAccountTag'
 *      methodUsed: // value for 'methodUsed'
 *   },
 * });
 */
export function useCreateCompleteTransactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompleteTransactionMutation, CreateCompleteTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompleteTransactionMutation, CreateCompleteTransactionMutationVariables>(CreateCompleteTransactionDocument, options);
      }
export type CreateCompleteTransactionMutationHookResult = ReturnType<typeof useCreateCompleteTransactionMutation>;
export type CreateCompleteTransactionMutationResult = Apollo.MutationResult<CreateCompleteTransactionMutation>;
export type CreateCompleteTransactionMutationOptions = Apollo.BaseMutationOptions<CreateCompleteTransactionMutation, CreateCompleteTransactionMutationVariables>;
export const CreateIndividualStripeAccountDocument = gql`
    mutation createIndividualStripeAccount($firstName: String, $lastName: String, $phone: String, $dob: BirthdayInput, $email: String, $govId: String, $businessDescription: String, $address: AddressInput, $website: String) {
  createIndividualStripeAccount(
    firstName: $firstName
    lastName: $lastName
    phone: $phone
    dob: $dob
    email: $email
    govId: $govId
    businessDescription: $businessDescription
    address: $address
    website: $website
  )
}
    `;
export type CreateIndividualStripeAccountMutationFn = Apollo.MutationFunction<CreateIndividualStripeAccountMutation, CreateIndividualStripeAccountMutationVariables>;

/**
 * __useCreateIndividualStripeAccountMutation__
 *
 * To run a mutation, you first call `useCreateIndividualStripeAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIndividualStripeAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIndividualStripeAccountMutation, { data, loading, error }] = useCreateIndividualStripeAccountMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      phone: // value for 'phone'
 *      dob: // value for 'dob'
 *      email: // value for 'email'
 *      govId: // value for 'govId'
 *      businessDescription: // value for 'businessDescription'
 *      address: // value for 'address'
 *      website: // value for 'website'
 *   },
 * });
 */
export function useCreateIndividualStripeAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateIndividualStripeAccountMutation, CreateIndividualStripeAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIndividualStripeAccountMutation, CreateIndividualStripeAccountMutationVariables>(CreateIndividualStripeAccountDocument, options);
      }
export type CreateIndividualStripeAccountMutationHookResult = ReturnType<typeof useCreateIndividualStripeAccountMutation>;
export type CreateIndividualStripeAccountMutationResult = Apollo.MutationResult<CreateIndividualStripeAccountMutation>;
export type CreateIndividualStripeAccountMutationOptions = Apollo.BaseMutationOptions<CreateIndividualStripeAccountMutation, CreateIndividualStripeAccountMutationVariables>;
export const CreateMerchantDocument = gql`
    mutation CreateMerchant($displayName: String, $merchantType: String, $phoneNumber: String, $userName: String, $location: AddressInput, $base64Image: String, $currency: String) {
  createMerchant(
    displayName: $displayName
    merchantType: $merchantType
    phoneNumber: $phoneNumber
    userName: $userName
    location: $location
    base64Image: $base64Image
    currency: $currency
  ) {
    userName
    hasMultipleAccounts
    hasMerchantAccount
    isMerchant
    displayName
    image
    id
    city
    isPrivate
    phone
    country {
      name
      alpha2
    }
    qr {
      image
      code
    }
    merchantProfileDetails {
      id
      merchantType
      displayName
      address {
        street
        streetAdditional
        city
        region
        postal
      }
      currency
      countryCode
      acceptsPayments
    }
  }
}
    `;
export type CreateMerchantMutationFn = Apollo.MutationFunction<CreateMerchantMutation, CreateMerchantMutationVariables>;

/**
 * __useCreateMerchantMutation__
 *
 * To run a mutation, you first call `useCreateMerchantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMerchantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMerchantMutation, { data, loading, error }] = useCreateMerchantMutation({
 *   variables: {
 *      displayName: // value for 'displayName'
 *      merchantType: // value for 'merchantType'
 *      phoneNumber: // value for 'phoneNumber'
 *      userName: // value for 'userName'
 *      location: // value for 'location'
 *      base64Image: // value for 'base64Image'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useCreateMerchantMutation(baseOptions?: Apollo.MutationHookOptions<CreateMerchantMutation, CreateMerchantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMerchantMutation, CreateMerchantMutationVariables>(CreateMerchantDocument, options);
      }
export type CreateMerchantMutationHookResult = ReturnType<typeof useCreateMerchantMutation>;
export type CreateMerchantMutationResult = Apollo.MutationResult<CreateMerchantMutation>;
export type CreateMerchantMutationOptions = Apollo.BaseMutationOptions<CreateMerchantMutation, CreateMerchantMutationVariables>;
export const CreateMerchantTransactionDocument = gql`
    mutation CreateMerchantTransaction($tip: Int!, $amount: Int!, $subtotal: Int!, $currency: String!, $destinationAccountTag: String!, $methodUsed: String!) {
  createChargeCardTransaction(
    tip: $tip
    amount: $amount
    subtotal: $subtotal
    currency: $currency
    destinationAccountTag: $destinationAccountTag
    methodUsed: $methodUsed
  ) {
    id
  }
}
    `;
export type CreateMerchantTransactionMutationFn = Apollo.MutationFunction<CreateMerchantTransactionMutation, CreateMerchantTransactionMutationVariables>;

/**
 * __useCreateMerchantTransactionMutation__
 *
 * To run a mutation, you first call `useCreateMerchantTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMerchantTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMerchantTransactionMutation, { data, loading, error }] = useCreateMerchantTransactionMutation({
 *   variables: {
 *      tip: // value for 'tip'
 *      amount: // value for 'amount'
 *      subtotal: // value for 'subtotal'
 *      currency: // value for 'currency'
 *      destinationAccountTag: // value for 'destinationAccountTag'
 *      methodUsed: // value for 'methodUsed'
 *   },
 * });
 */
export function useCreateMerchantTransactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateMerchantTransactionMutation, CreateMerchantTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMerchantTransactionMutation, CreateMerchantTransactionMutationVariables>(CreateMerchantTransactionDocument, options);
      }
export type CreateMerchantTransactionMutationHookResult = ReturnType<typeof useCreateMerchantTransactionMutation>;
export type CreateMerchantTransactionMutationResult = Apollo.MutationResult<CreateMerchantTransactionMutation>;
export type CreateMerchantTransactionMutationOptions = Apollo.BaseMutationOptions<CreateMerchantTransactionMutation, CreateMerchantTransactionMutationVariables>;
export const CreateNewUserDocument = gql`
    mutation CreateNewUser($email: String, $password: String, $firstName: String, $lastName: String, $userName: String, $city: String, $country: String, $phone: String) {
  createNewUser(
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
    userName: $userName
    city: $city
    country: $country
    phone: $phone
  )
}
    `;
export type CreateNewUserMutationFn = Apollo.MutationFunction<CreateNewUserMutation, CreateNewUserMutationVariables>;

/**
 * __useCreateNewUserMutation__
 *
 * To run a mutation, you first call `useCreateNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewUserMutation, { data, loading, error }] = useCreateNewUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      userName: // value for 'userName'
 *      city: // value for 'city'
 *      country: // value for 'country'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useCreateNewUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewUserMutation, CreateNewUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewUserMutation, CreateNewUserMutationVariables>(CreateNewUserDocument, options);
      }
export type CreateNewUserMutationHookResult = ReturnType<typeof useCreateNewUserMutation>;
export type CreateNewUserMutationResult = Apollo.MutationResult<CreateNewUserMutation>;
export type CreateNewUserMutationOptions = Apollo.BaseMutationOptions<CreateNewUserMutation, CreateNewUserMutationVariables>;
export const CreateRefundCardTransactionDocument = gql`
    mutation CreateRefundCardTransaction($amount: Int, $currency: String, $notes: String, $transaction: String, $destinationAccountTag: String, $txDetailId: String) {
  createRefundCardTransaction(
    amount: $amount
    currency: $currency
    notes: $notes
    transaction: $transaction
    destinationAccountTag: $destinationAccountTag
    txDetailId: $txDetailId
  ) {
    id
    receiver {
      id
      userName
      displayName
      image
    }
    sender {
      id
      userName
      displayName
      image
    }
    dateOfTransaction
    amount
    total {
      major
      value
      display
    }
    currency
    isRefunded
  }
}
    `;
export type CreateRefundCardTransactionMutationFn = Apollo.MutationFunction<CreateRefundCardTransactionMutation, CreateRefundCardTransactionMutationVariables>;

/**
 * __useCreateRefundCardTransactionMutation__
 *
 * To run a mutation, you first call `useCreateRefundCardTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRefundCardTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRefundCardTransactionMutation, { data, loading, error }] = useCreateRefundCardTransactionMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      currency: // value for 'currency'
 *      notes: // value for 'notes'
 *      transaction: // value for 'transaction'
 *      destinationAccountTag: // value for 'destinationAccountTag'
 *      txDetailId: // value for 'txDetailId'
 *   },
 * });
 */
export function useCreateRefundCardTransactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateRefundCardTransactionMutation, CreateRefundCardTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRefundCardTransactionMutation, CreateRefundCardTransactionMutationVariables>(CreateRefundCardTransactionDocument, options);
      }
export type CreateRefundCardTransactionMutationHookResult = ReturnType<typeof useCreateRefundCardTransactionMutation>;
export type CreateRefundCardTransactionMutationResult = Apollo.MutationResult<CreateRefundCardTransactionMutation>;
export type CreateRefundCardTransactionMutationOptions = Apollo.BaseMutationOptions<CreateRefundCardTransactionMutation, CreateRefundCardTransactionMutationVariables>;
export const CreateReviewDocument = gql`
    mutation CreateReview($rating: Int!, $details: String!, $merchantId: String!, $relatedTransaction: String!) {
  createReview(
    rating: $rating
    details: $details
    merchantId: $merchantId
    relatedTransaction: $relatedTransaction
  ) {
    id
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      rating: // value for 'rating'
 *      details: // value for 'details'
 *      merchantId: // value for 'merchantId'
 *      relatedTransaction: // value for 'relatedTransaction'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const StartTicketOrderDocument = gql`
    mutation startTicketOrder($tickets: [TicketsWithAmount], $merchantId: String, $platformEventId: String) {
  startTicketOrder(
    tickets: $tickets
    merchantId: $merchantId
    platformEventId: $platformEventId
  ) {
    orderId
  }
}
    `;
export type StartTicketOrderMutationFn = Apollo.MutationFunction<StartTicketOrderMutation, StartTicketOrderMutationVariables>;

/**
 * __useStartTicketOrderMutation__
 *
 * To run a mutation, you first call `useStartTicketOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartTicketOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startTicketOrderMutation, { data, loading, error }] = useStartTicketOrderMutation({
 *   variables: {
 *      tickets: // value for 'tickets'
 *      merchantId: // value for 'merchantId'
 *      platformEventId: // value for 'platformEventId'
 *   },
 * });
 */
export function useStartTicketOrderMutation(baseOptions?: Apollo.MutationHookOptions<StartTicketOrderMutation, StartTicketOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartTicketOrderMutation, StartTicketOrderMutationVariables>(StartTicketOrderDocument, options);
      }
export type StartTicketOrderMutationHookResult = ReturnType<typeof useStartTicketOrderMutation>;
export type StartTicketOrderMutationResult = Apollo.MutationResult<StartTicketOrderMutation>;
export type StartTicketOrderMutationOptions = Apollo.BaseMutationOptions<StartTicketOrderMutation, StartTicketOrderMutationVariables>;
export const ConfirmAchQuoteDocument = gql`
    mutation ConfirmACHQuote($quoteId: String) {
  confirmACHQuote(quoteId: $quoteId) {
    sourceAmount
    sourceCurrencyCode
    destinationAmount
    email
    transactionId
    fiatAmount
    fiatCurrencyCode
  }
}
    `;
export type ConfirmAchQuoteMutationFn = Apollo.MutationFunction<ConfirmAchQuoteMutation, ConfirmAchQuoteMutationVariables>;

/**
 * __useConfirmAchQuoteMutation__
 *
 * To run a mutation, you first call `useConfirmAchQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmAchQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmAchQuoteMutation, { data, loading, error }] = useConfirmAchQuoteMutation({
 *   variables: {
 *      quoteId: // value for 'quoteId'
 *   },
 * });
 */
export function useConfirmAchQuoteMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmAchQuoteMutation, ConfirmAchQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmAchQuoteMutation, ConfirmAchQuoteMutationVariables>(ConfirmAchQuoteDocument, options);
      }
export type ConfirmAchQuoteMutationHookResult = ReturnType<typeof useConfirmAchQuoteMutation>;
export type ConfirmAchQuoteMutationResult = Apollo.MutationResult<ConfirmAchQuoteMutation>;
export type ConfirmAchQuoteMutationOptions = Apollo.BaseMutationOptions<ConfirmAchQuoteMutation, ConfirmAchQuoteMutationVariables>;
export const ConfirmTransferQuoteDocument = gql`
    mutation ConfirmTransferQuote($quoteId: String, $assetCode: String) {
  confirmQuote(quoteId: $quoteId, assetName: $assetCode) {
    sourceAmount
    sourceCurrencyCode
    destinationAmount
    email
    transactionId
    fiatAmount
    fiatCurrencyCode
  }
}
    `;
export type ConfirmTransferQuoteMutationFn = Apollo.MutationFunction<ConfirmTransferQuoteMutation, ConfirmTransferQuoteMutationVariables>;

/**
 * __useConfirmTransferQuoteMutation__
 *
 * To run a mutation, you first call `useConfirmTransferQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmTransferQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmTransferQuoteMutation, { data, loading, error }] = useConfirmTransferQuoteMutation({
 *   variables: {
 *      quoteId: // value for 'quoteId'
 *      assetCode: // value for 'assetCode'
 *   },
 * });
 */
export function useConfirmTransferQuoteMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmTransferQuoteMutation, ConfirmTransferQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmTransferQuoteMutation, ConfirmTransferQuoteMutationVariables>(ConfirmTransferQuoteDocument, options);
      }
export type ConfirmTransferQuoteMutationHookResult = ReturnType<typeof useConfirmTransferQuoteMutation>;
export type ConfirmTransferQuoteMutationResult = Apollo.MutationResult<ConfirmTransferQuoteMutation>;
export type ConfirmTransferQuoteMutationOptions = Apollo.BaseMutationOptions<ConfirmTransferQuoteMutation, ConfirmTransferQuoteMutationVariables>;
export const CreateAchPaymentMethodDocument = gql`
    mutation CreateACHPaymentMethod($publicToken: String!, $plaidBankId: String!) {
  createACHPayMethod(publicToken: $publicToken, plaidBankId: $plaidBankId) {
    id
    lastFour
    cardBrand {
      id
      display
      image
    }
    status
    type
    expirationDate
    name
  }
}
    `;
export type CreateAchPaymentMethodMutationFn = Apollo.MutationFunction<CreateAchPaymentMethodMutation, CreateAchPaymentMethodMutationVariables>;

/**
 * __useCreateAchPaymentMethodMutation__
 *
 * To run a mutation, you first call `useCreateAchPaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAchPaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAchPaymentMethodMutation, { data, loading, error }] = useCreateAchPaymentMethodMutation({
 *   variables: {
 *      publicToken: // value for 'publicToken'
 *      plaidBankId: // value for 'plaidBankId'
 *   },
 * });
 */
export function useCreateAchPaymentMethodMutation(baseOptions?: Apollo.MutationHookOptions<CreateAchPaymentMethodMutation, CreateAchPaymentMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAchPaymentMethodMutation, CreateAchPaymentMethodMutationVariables>(CreateAchPaymentMethodDocument, options);
      }
export type CreateAchPaymentMethodMutationHookResult = ReturnType<typeof useCreateAchPaymentMethodMutation>;
export type CreateAchPaymentMethodMutationResult = Apollo.MutationResult<CreateAchPaymentMethodMutation>;
export type CreateAchPaymentMethodMutationOptions = Apollo.BaseMutationOptions<CreateAchPaymentMethodMutation, CreateAchPaymentMethodMutationVariables>;
export const CreateCardAssetOrderDocument = gql`
    mutation CreateCardAssetOrder($sourceAmount: String, $sourceCurrency: String, $reservationId: String, $paymentMethodId: String, $cvvConfirmation: String, $destinationCurrency: String) {
  createCardAssetOrder(
    sourceAmount: $sourceAmount
    sourceCurrency: $sourceCurrency
    reservationId: $reservationId
    paymentMethodId: $paymentMethodId
    cvvConfirmation: $cvvConfirmation
    destinationCurrency: $destinationCurrency
  ) {
    transaction {
      id
    }
    walletOrder {
      id
      status
      smsNeeded
      card2faNeeded
    }
  }
}
    `;
export type CreateCardAssetOrderMutationFn = Apollo.MutationFunction<CreateCardAssetOrderMutation, CreateCardAssetOrderMutationVariables>;

/**
 * __useCreateCardAssetOrderMutation__
 *
 * To run a mutation, you first call `useCreateCardAssetOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardAssetOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardAssetOrderMutation, { data, loading, error }] = useCreateCardAssetOrderMutation({
 *   variables: {
 *      sourceAmount: // value for 'sourceAmount'
 *      sourceCurrency: // value for 'sourceCurrency'
 *      reservationId: // value for 'reservationId'
 *      paymentMethodId: // value for 'paymentMethodId'
 *      cvvConfirmation: // value for 'cvvConfirmation'
 *      destinationCurrency: // value for 'destinationCurrency'
 *   },
 * });
 */
export function useCreateCardAssetOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateCardAssetOrderMutation, CreateCardAssetOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCardAssetOrderMutation, CreateCardAssetOrderMutationVariables>(CreateCardAssetOrderDocument, options);
      }
export type CreateCardAssetOrderMutationHookResult = ReturnType<typeof useCreateCardAssetOrderMutation>;
export type CreateCardAssetOrderMutationResult = Apollo.MutationResult<CreateCardAssetOrderMutation>;
export type CreateCardAssetOrderMutationOptions = Apollo.BaseMutationOptions<CreateCardAssetOrderMutation, CreateCardAssetOrderMutationVariables>;
export const CreateCardOrderReservationDocument = gql`
    mutation CreateCardOrderReservation($sourceAmount: String, $sourceCurrency: String, $destinationCurrency: String) {
  createCardOrderReservation(
    sourceAmount: $sourceAmount
    sourceCurrency: $sourceCurrency
    destinationCurrency: $destinationCurrency
  ) {
    reservationId
  }
}
    `;
export type CreateCardOrderReservationMutationFn = Apollo.MutationFunction<CreateCardOrderReservationMutation, CreateCardOrderReservationMutationVariables>;

/**
 * __useCreateCardOrderReservationMutation__
 *
 * To run a mutation, you first call `useCreateCardOrderReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardOrderReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardOrderReservationMutation, { data, loading, error }] = useCreateCardOrderReservationMutation({
 *   variables: {
 *      sourceAmount: // value for 'sourceAmount'
 *      sourceCurrency: // value for 'sourceCurrency'
 *      destinationCurrency: // value for 'destinationCurrency'
 *   },
 * });
 */
export function useCreateCardOrderReservationMutation(baseOptions?: Apollo.MutationHookOptions<CreateCardOrderReservationMutation, CreateCardOrderReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCardOrderReservationMutation, CreateCardOrderReservationMutationVariables>(CreateCardOrderReservationDocument, options);
      }
export type CreateCardOrderReservationMutationHookResult = ReturnType<typeof useCreateCardOrderReservationMutation>;
export type CreateCardOrderReservationMutationResult = Apollo.MutationResult<CreateCardOrderReservationMutation>;
export type CreateCardOrderReservationMutationOptions = Apollo.BaseMutationOptions<CreateCardOrderReservationMutation, CreateCardOrderReservationMutationVariables>;
export const EditCreditCardDocument = gql`
    mutation EditCreditCard($id: String!, $cardBrand: String, $tokenizedCardNum: String, $tokenizedCVC: String, $nameOnCard: String, $expirationDate: String, $lastFour: String, $street: String, $streetAdditional: String, $city: String, $postal: String, $region: String, $country: String) {
  editPaymentMethod(
    id: $id
    cardBrand: $cardBrand
    tokenizedCardNum: $tokenizedCardNum
    tokenizedCVC: $tokenizedCVC
    nameOnCard: $nameOnCard
    expirationDate: $expirationDate
    lastFour: $lastFour
    street: $street
    streetAdditional: $streetAdditional
    city: $city
    postal: $postal
    region: $region
    country: $country
  ) {
    id
  }
}
    `;
export type EditCreditCardMutationFn = Apollo.MutationFunction<EditCreditCardMutation, EditCreditCardMutationVariables>;

/**
 * __useEditCreditCardMutation__
 *
 * To run a mutation, you first call `useEditCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCreditCardMutation, { data, loading, error }] = useEditCreditCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      cardBrand: // value for 'cardBrand'
 *      tokenizedCardNum: // value for 'tokenizedCardNum'
 *      tokenizedCVC: // value for 'tokenizedCVC'
 *      nameOnCard: // value for 'nameOnCard'
 *      expirationDate: // value for 'expirationDate'
 *      lastFour: // value for 'lastFour'
 *      street: // value for 'street'
 *      streetAdditional: // value for 'streetAdditional'
 *      city: // value for 'city'
 *      postal: // value for 'postal'
 *      region: // value for 'region'
 *      country: // value for 'country'
 *   },
 * });
 */
export function useEditCreditCardMutation(baseOptions?: Apollo.MutationHookOptions<EditCreditCardMutation, EditCreditCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCreditCardMutation, EditCreditCardMutationVariables>(EditCreditCardDocument, options);
      }
export type EditCreditCardMutationHookResult = ReturnType<typeof useEditCreditCardMutation>;
export type EditCreditCardMutationResult = Apollo.MutationResult<EditCreditCardMutation>;
export type EditCreditCardMutationOptions = Apollo.BaseMutationOptions<EditCreditCardMutation, EditCreditCardMutationVariables>;
export const EtxDistributionDocument = gql`
    mutation etxDistribution($product: String!, $amount: Float!, $amountCurrency: String!, $userEmail: String!, $transactionType: String) {
  etxDistribution(
    product: $product
    amount: $amount
    amountCurrency: $amountCurrency
    userEmail: $userEmail
    transactionType: $transactionType
  ) {
    uuid
    destinationAsset {
      price
    }
    product
    sourceCurrencyCode
    sourceAmount
    distribution {
      amount
      currency
    }
    depositAddresses {
      BTC
      ETH
      XLM
      AVAX
      MATIC
    }
  }
}
    `;
export type EtxDistributionMutationFn = Apollo.MutationFunction<EtxDistributionMutation, EtxDistributionMutationVariables>;

/**
 * __useEtxDistributionMutation__
 *
 * To run a mutation, you first call `useEtxDistributionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEtxDistributionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [etxDistributionMutation, { data, loading, error }] = useEtxDistributionMutation({
 *   variables: {
 *      product: // value for 'product'
 *      amount: // value for 'amount'
 *      amountCurrency: // value for 'amountCurrency'
 *      userEmail: // value for 'userEmail'
 *      transactionType: // value for 'transactionType'
 *   },
 * });
 */
export function useEtxDistributionMutation(baseOptions?: Apollo.MutationHookOptions<EtxDistributionMutation, EtxDistributionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EtxDistributionMutation, EtxDistributionMutationVariables>(EtxDistributionDocument, options);
      }
export type EtxDistributionMutationHookResult = ReturnType<typeof useEtxDistributionMutation>;
export type EtxDistributionMutationResult = Apollo.MutationResult<EtxDistributionMutation>;
export type EtxDistributionMutationOptions = Apollo.BaseMutationOptions<EtxDistributionMutation, EtxDistributionMutationVariables>;
export const EtxOrderDetailDocument = gql`
    mutation etxOrderDetail($uuid: String!) {
  etxOrderDetail(uuid: $uuid) {
    distribution {
      currencyCode
      percentage
      currencyName
      image
    }
  }
}
    `;
export type EtxOrderDetailMutationFn = Apollo.MutationFunction<EtxOrderDetailMutation, EtxOrderDetailMutationVariables>;

/**
 * __useEtxOrderDetailMutation__
 *
 * To run a mutation, you first call `useEtxOrderDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEtxOrderDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [etxOrderDetailMutation, { data, loading, error }] = useEtxOrderDetailMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useEtxOrderDetailMutation(baseOptions?: Apollo.MutationHookOptions<EtxOrderDetailMutation, EtxOrderDetailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EtxOrderDetailMutation, EtxOrderDetailMutationVariables>(EtxOrderDetailDocument, options);
      }
export type EtxOrderDetailMutationHookResult = ReturnType<typeof useEtxOrderDetailMutation>;
export type EtxOrderDetailMutationResult = Apollo.MutationResult<EtxOrderDetailMutation>;
export type EtxOrderDetailMutationOptions = Apollo.BaseMutationOptions<EtxOrderDetailMutation, EtxOrderDetailMutationVariables>;
export const GetEtxWalletDocument = gql`
    mutation getETXWallet($notes: String) {
  getETXBlocksWallet(notes: $notes) {
    id
    balances {
      totalBalances {
        name
        balance
      }
      availableBalances {
        name
        balance
      }
    }
  }
}
    `;
export type GetEtxWalletMutationFn = Apollo.MutationFunction<GetEtxWalletMutation, GetEtxWalletMutationVariables>;

/**
 * __useGetEtxWalletMutation__
 *
 * To run a mutation, you first call `useGetEtxWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetEtxWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getEtxWalletMutation, { data, loading, error }] = useGetEtxWalletMutation({
 *   variables: {
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useGetEtxWalletMutation(baseOptions?: Apollo.MutationHookOptions<GetEtxWalletMutation, GetEtxWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetEtxWalletMutation, GetEtxWalletMutationVariables>(GetEtxWalletDocument, options);
      }
export type GetEtxWalletMutationHookResult = ReturnType<typeof useGetEtxWalletMutation>;
export type GetEtxWalletMutationResult = Apollo.MutationResult<GetEtxWalletMutation>;
export type GetEtxWalletMutationOptions = Apollo.BaseMutationOptions<GetEtxWalletMutation, GetEtxWalletMutationVariables>;
export const GetPlaidTokenDocument = gql`
    query GetPlaidToken {
  getToken
}
    `;

/**
 * __useGetPlaidTokenQuery__
 *
 * To run a query within a React component, call `useGetPlaidTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaidTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaidTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlaidTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetPlaidTokenQuery, GetPlaidTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaidTokenQuery, GetPlaidTokenQueryVariables>(GetPlaidTokenDocument, options);
      }
export function useGetPlaidTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaidTokenQuery, GetPlaidTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaidTokenQuery, GetPlaidTokenQueryVariables>(GetPlaidTokenDocument, options);
        }
export type GetPlaidTokenQueryHookResult = ReturnType<typeof useGetPlaidTokenQuery>;
export type GetPlaidTokenLazyQueryHookResult = ReturnType<typeof useGetPlaidTokenLazyQuery>;
export type GetPlaidTokenQueryResult = Apollo.QueryResult<GetPlaidTokenQuery, GetPlaidTokenQueryVariables>;
export const PostAuthCodesDocument = gql`
    mutation PostAuthCodes($orderId: String!, $reservationId: String!, $sms: String, $card2Fa: String) {
  postAuthCodes(
    orderId: $orderId
    reservationId: $reservationId
    sms: $sms
    card2Fa: $card2Fa
  )
}
    `;
export type PostAuthCodesMutationFn = Apollo.MutationFunction<PostAuthCodesMutation, PostAuthCodesMutationVariables>;

/**
 * __usePostAuthCodesMutation__
 *
 * To run a mutation, you first call `usePostAuthCodesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostAuthCodesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postAuthCodesMutation, { data, loading, error }] = usePostAuthCodesMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      reservationId: // value for 'reservationId'
 *      sms: // value for 'sms'
 *      card2Fa: // value for 'card2Fa'
 *   },
 * });
 */
export function usePostAuthCodesMutation(baseOptions?: Apollo.MutationHookOptions<PostAuthCodesMutation, PostAuthCodesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostAuthCodesMutation, PostAuthCodesMutationVariables>(PostAuthCodesDocument, options);
      }
export type PostAuthCodesMutationHookResult = ReturnType<typeof usePostAuthCodesMutation>;
export type PostAuthCodesMutationResult = Apollo.MutationResult<PostAuthCodesMutation>;
export type PostAuthCodesMutationOptions = Apollo.BaseMutationOptions<PostAuthCodesMutation, PostAuthCodesMutationVariables>;
export const RemovePaymentMethodDocument = gql`
    mutation RemovePaymentMethod($id: String!, $type: PaymentMethodCategory!) {
  deletePaymentMethod(type: $type, paymentMethodId: $id) {
    message
    deletedCC {
      id
    }
  }
}
    `;
export type RemovePaymentMethodMutationFn = Apollo.MutationFunction<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>;

/**
 * __useRemovePaymentMethodMutation__
 *
 * To run a mutation, you first call `useRemovePaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePaymentMethodMutation, { data, loading, error }] = useRemovePaymentMethodMutation({
 *   variables: {
 *      id: // value for 'id'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useRemovePaymentMethodMutation(baseOptions?: Apollo.MutationHookOptions<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>(RemovePaymentMethodDocument, options);
      }
export type RemovePaymentMethodMutationHookResult = ReturnType<typeof useRemovePaymentMethodMutation>;
export type RemovePaymentMethodMutationResult = Apollo.MutationResult<RemovePaymentMethodMutation>;
export type RemovePaymentMethodMutationOptions = Apollo.BaseMutationOptions<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation verifyEmail($email: String) {
  verifyEmail(email: $email)
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const StartAchPurchaseQuoteDocument = gql`
    mutation StartACHPurchaseQuote($destAmount: String!, $sourceCurrencyCode: String!, $destinationCurrencyCode: String!, $paymentMethodId: String!) {
  startACHPurchaseQuote(
    destAmount: $destAmount
    sourceCurrencyCode: $sourceCurrencyCode
    destinationCurrencyCode: $destinationCurrencyCode
    paymentMethodId: $paymentMethodId
  ) {
    quoteId
  }
}
    `;
export type StartAchPurchaseQuoteMutationFn = Apollo.MutationFunction<StartAchPurchaseQuoteMutation, StartAchPurchaseQuoteMutationVariables>;

/**
 * __useStartAchPurchaseQuoteMutation__
 *
 * To run a mutation, you first call `useStartAchPurchaseQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartAchPurchaseQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startAchPurchaseQuoteMutation, { data, loading, error }] = useStartAchPurchaseQuoteMutation({
 *   variables: {
 *      destAmount: // value for 'destAmount'
 *      sourceCurrencyCode: // value for 'sourceCurrencyCode'
 *      destinationCurrencyCode: // value for 'destinationCurrencyCode'
 *      paymentMethodId: // value for 'paymentMethodId'
 *   },
 * });
 */
export function useStartAchPurchaseQuoteMutation(baseOptions?: Apollo.MutationHookOptions<StartAchPurchaseQuoteMutation, StartAchPurchaseQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartAchPurchaseQuoteMutation, StartAchPurchaseQuoteMutationVariables>(StartAchPurchaseQuoteDocument, options);
      }
export type StartAchPurchaseQuoteMutationHookResult = ReturnType<typeof useStartAchPurchaseQuoteMutation>;
export type StartAchPurchaseQuoteMutationResult = Apollo.MutationResult<StartAchPurchaseQuoteMutation>;
export type StartAchPurchaseQuoteMutationOptions = Apollo.BaseMutationOptions<StartAchPurchaseQuoteMutation, StartAchPurchaseQuoteMutationVariables>;
export const StartEtxTransferQuoteDocument = gql`
    mutation startETXTransferQuote($etxDistributionuuid: String, $maxOption: Boolean) {
  startETXTransferQuote(
    etxDistributionuuid: $etxDistributionuuid
    maxOption: $maxOption
  ) {
    transactionId
  }
}
    `;
export type StartEtxTransferQuoteMutationFn = Apollo.MutationFunction<StartEtxTransferQuoteMutation, StartEtxTransferQuoteMutationVariables>;

/**
 * __useStartEtxTransferQuoteMutation__
 *
 * To run a mutation, you first call `useStartEtxTransferQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartEtxTransferQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startEtxTransferQuoteMutation, { data, loading, error }] = useStartEtxTransferQuoteMutation({
 *   variables: {
 *      etxDistributionuuid: // value for 'etxDistributionuuid'
 *      maxOption: // value for 'maxOption'
 *   },
 * });
 */
export function useStartEtxTransferQuoteMutation(baseOptions?: Apollo.MutationHookOptions<StartEtxTransferQuoteMutation, StartEtxTransferQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartEtxTransferQuoteMutation, StartEtxTransferQuoteMutationVariables>(StartEtxTransferQuoteDocument, options);
      }
export type StartEtxTransferQuoteMutationHookResult = ReturnType<typeof useStartEtxTransferQuoteMutation>;
export type StartEtxTransferQuoteMutationResult = Apollo.MutationResult<StartEtxTransferQuoteMutation>;
export type StartEtxTransferQuoteMutationOptions = Apollo.BaseMutationOptions<StartEtxTransferQuoteMutation, StartEtxTransferQuoteMutationVariables>;
export const StartEtxWithdrawlTransferQuoteDocument = gql`
    mutation startETXWithdrawlTransferQuote($etxDistributionuuid: String, $maxOption: Boolean) {
  startETXWithdrawlTransferQuote(
    etxDistributionuuid: $etxDistributionuuid
    maxOption: $maxOption
  ) {
    transactionId
  }
}
    `;
export type StartEtxWithdrawlTransferQuoteMutationFn = Apollo.MutationFunction<StartEtxWithdrawlTransferQuoteMutation, StartEtxWithdrawlTransferQuoteMutationVariables>;

/**
 * __useStartEtxWithdrawlTransferQuoteMutation__
 *
 * To run a mutation, you first call `useStartEtxWithdrawlTransferQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartEtxWithdrawlTransferQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startEtxWithdrawlTransferQuoteMutation, { data, loading, error }] = useStartEtxWithdrawlTransferQuoteMutation({
 *   variables: {
 *      etxDistributionuuid: // value for 'etxDistributionuuid'
 *      maxOption: // value for 'maxOption'
 *   },
 * });
 */
export function useStartEtxWithdrawlTransferQuoteMutation(baseOptions?: Apollo.MutationHookOptions<StartEtxWithdrawlTransferQuoteMutation, StartEtxWithdrawlTransferQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartEtxWithdrawlTransferQuoteMutation, StartEtxWithdrawlTransferQuoteMutationVariables>(StartEtxWithdrawlTransferQuoteDocument, options);
      }
export type StartEtxWithdrawlTransferQuoteMutationHookResult = ReturnType<typeof useStartEtxWithdrawlTransferQuoteMutation>;
export type StartEtxWithdrawlTransferQuoteMutationResult = Apollo.MutationResult<StartEtxWithdrawlTransferQuoteMutation>;
export type StartEtxWithdrawlTransferQuoteMutationOptions = Apollo.BaseMutationOptions<StartEtxWithdrawlTransferQuoteMutation, StartEtxWithdrawlTransferQuoteMutationVariables>;
export const StartPayoutQuoteDocument = gql`
    mutation StartPayoutQuote($sourceCurrencyCode: String, $destinationCurrencyCode: String, $destAmount: String, $bankAccountId: String, $maxOption: Boolean) {
  startPayoutQuote(
    destAmount: $destAmount
    sourceCurrencyCode: $sourceCurrencyCode
    destinationCurrencyCode: $destinationCurrencyCode
    bankAccountId: $bankAccountId
    maxOption: $maxOption
  ) {
    quoteId
    sourceCurrency
    sourceAmount
    sourceCurrencyCode
    destinationCurrency
    destinationCurrencyCode
    destinationAmount
    exchangeRate
    expiresAt
    fiatFees
    sourceFee
  }
}
    `;
export type StartPayoutQuoteMutationFn = Apollo.MutationFunction<StartPayoutQuoteMutation, StartPayoutQuoteMutationVariables>;

/**
 * __useStartPayoutQuoteMutation__
 *
 * To run a mutation, you first call `useStartPayoutQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartPayoutQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startPayoutQuoteMutation, { data, loading, error }] = useStartPayoutQuoteMutation({
 *   variables: {
 *      sourceCurrencyCode: // value for 'sourceCurrencyCode'
 *      destinationCurrencyCode: // value for 'destinationCurrencyCode'
 *      destAmount: // value for 'destAmount'
 *      bankAccountId: // value for 'bankAccountId'
 *      maxOption: // value for 'maxOption'
 *   },
 * });
 */
export function useStartPayoutQuoteMutation(baseOptions?: Apollo.MutationHookOptions<StartPayoutQuoteMutation, StartPayoutQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartPayoutQuoteMutation, StartPayoutQuoteMutationVariables>(StartPayoutQuoteDocument, options);
      }
export type StartPayoutQuoteMutationHookResult = ReturnType<typeof useStartPayoutQuoteMutation>;
export type StartPayoutQuoteMutationResult = Apollo.MutationResult<StartPayoutQuoteMutation>;
export type StartPayoutQuoteMutationOptions = Apollo.BaseMutationOptions<StartPayoutQuoteMutation, StartPayoutQuoteMutationVariables>;
export const StartQuoteDocument = gql`
    mutation StartQuote($destAmount: String!, $sourceCurrencyCode: String!, $destinationCurrencyCode: String!) {
  startQuote(
    destAmount: $destAmount
    sourceCurrencyCode: $sourceCurrencyCode
    destinationCurrencyCode: $destinationCurrencyCode
  ) {
    quoteId
  }
}
    `;
export type StartQuoteMutationFn = Apollo.MutationFunction<StartQuoteMutation, StartQuoteMutationVariables>;

/**
 * __useStartQuoteMutation__
 *
 * To run a mutation, you first call `useStartQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startQuoteMutation, { data, loading, error }] = useStartQuoteMutation({
 *   variables: {
 *      destAmount: // value for 'destAmount'
 *      sourceCurrencyCode: // value for 'sourceCurrencyCode'
 *      destinationCurrencyCode: // value for 'destinationCurrencyCode'
 *   },
 * });
 */
export function useStartQuoteMutation(baseOptions?: Apollo.MutationHookOptions<StartQuoteMutation, StartQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartQuoteMutation, StartQuoteMutationVariables>(StartQuoteDocument, options);
      }
export type StartQuoteMutationHookResult = ReturnType<typeof useStartQuoteMutation>;
export type StartQuoteMutationResult = Apollo.MutationResult<StartQuoteMutation>;
export type StartQuoteMutationOptions = Apollo.BaseMutationOptions<StartQuoteMutation, StartQuoteMutationVariables>;
export const StartTransferQuoteDocument = gql`
    mutation StartTransferQuote($sourceCurrencyCode: String, $destinationCurrencyCode: String, $sourceAmount: String!, $externalAddress: String, $notes: String) {
  startExternalTransferQuote(
    sourceCurrencyCode: $sourceCurrencyCode
    destinationCurrencyCode: $destinationCurrencyCode
    sourceAmount: $sourceAmount
    externalAddress: $externalAddress
    notes: $notes
  ) {
    quoteId
  }
}
    `;
export type StartTransferQuoteMutationFn = Apollo.MutationFunction<StartTransferQuoteMutation, StartTransferQuoteMutationVariables>;

/**
 * __useStartTransferQuoteMutation__
 *
 * To run a mutation, you first call `useStartTransferQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartTransferQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startTransferQuoteMutation, { data, loading, error }] = useStartTransferQuoteMutation({
 *   variables: {
 *      sourceCurrencyCode: // value for 'sourceCurrencyCode'
 *      destinationCurrencyCode: // value for 'destinationCurrencyCode'
 *      sourceAmount: // value for 'sourceAmount'
 *      externalAddress: // value for 'externalAddress'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useStartTransferQuoteMutation(baseOptions?: Apollo.MutationHookOptions<StartTransferQuoteMutation, StartTransferQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartTransferQuoteMutation, StartTransferQuoteMutationVariables>(StartTransferQuoteDocument, options);
      }
export type StartTransferQuoteMutationHookResult = ReturnType<typeof useStartTransferQuoteMutation>;
export type StartTransferQuoteMutationResult = Apollo.MutationResult<StartTransferQuoteMutation>;
export type StartTransferQuoteMutationOptions = Apollo.BaseMutationOptions<StartTransferQuoteMutation, StartTransferQuoteMutationVariables>;
export const StartUserTransferQuoteDocument = gql`
    mutation startUserTransferQuote($sourceCurrencyCode: String, $destAmount: String, $sourceAmount: String!, $destinationCurrencyCode: String, $destination: String, $notes: String, $maxOption: Boolean) {
  startUserTransferQuote(
    sourceCurrencyCode: $sourceCurrencyCode
    destAmount: $destAmount
    sourceAmount: $sourceAmount
    destinationCurrencyCode: $destinationCurrencyCode
    destination: $destination
    notes: $notes
    maxOption: $maxOption
  ) {
    quoteId
  }
}
    `;
export type StartUserTransferQuoteMutationFn = Apollo.MutationFunction<StartUserTransferQuoteMutation, StartUserTransferQuoteMutationVariables>;

/**
 * __useStartUserTransferQuoteMutation__
 *
 * To run a mutation, you first call `useStartUserTransferQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartUserTransferQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startUserTransferQuoteMutation, { data, loading, error }] = useStartUserTransferQuoteMutation({
 *   variables: {
 *      sourceCurrencyCode: // value for 'sourceCurrencyCode'
 *      destAmount: // value for 'destAmount'
 *      sourceAmount: // value for 'sourceAmount'
 *      destinationCurrencyCode: // value for 'destinationCurrencyCode'
 *      destination: // value for 'destination'
 *      notes: // value for 'notes'
 *      maxOption: // value for 'maxOption'
 *   },
 * });
 */
export function useStartUserTransferQuoteMutation(baseOptions?: Apollo.MutationHookOptions<StartUserTransferQuoteMutation, StartUserTransferQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartUserTransferQuoteMutation, StartUserTransferQuoteMutationVariables>(StartUserTransferQuoteDocument, options);
      }
export type StartUserTransferQuoteMutationHookResult = ReturnType<typeof useStartUserTransferQuoteMutation>;
export type StartUserTransferQuoteMutationResult = Apollo.MutationResult<StartUserTransferQuoteMutation>;
export type StartUserTransferQuoteMutationOptions = Apollo.BaseMutationOptions<StartUserTransferQuoteMutation, StartUserTransferQuoteMutationVariables>;
export const UpdateAccountDocument = gql`
    mutation updateAccount($country: String, $city: String, $phone: String) {
  updateAccount(country: $country, phone: $phone, city: $city) {
    country {
      name
      alpha2
    }
    phone
    city
  }
}
    `;
export type UpdateAccountMutationFn = Apollo.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      country: // value for 'country'
 *      city: // value for 'city'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, options);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = Apollo.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = Apollo.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const UpdateStripeBankingDocument = gql`
    mutation updateStripeBanking($routingNumber: String, $accountNumber: String) {
  updateStripeBanking(
    routingNumber: $routingNumber
    accountNumber: $accountNumber
  ) {
    status
    verificationRequirements
  }
}
    `;
export type UpdateStripeBankingMutationFn = Apollo.MutationFunction<UpdateStripeBankingMutation, UpdateStripeBankingMutationVariables>;

/**
 * __useUpdateStripeBankingMutation__
 *
 * To run a mutation, you first call `useUpdateStripeBankingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStripeBankingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStripeBankingMutation, { data, loading, error }] = useUpdateStripeBankingMutation({
 *   variables: {
 *      routingNumber: // value for 'routingNumber'
 *      accountNumber: // value for 'accountNumber'
 *   },
 * });
 */
export function useUpdateStripeBankingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStripeBankingMutation, UpdateStripeBankingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStripeBankingMutation, UpdateStripeBankingMutationVariables>(UpdateStripeBankingDocument, options);
      }
export type UpdateStripeBankingMutationHookResult = ReturnType<typeof useUpdateStripeBankingMutation>;
export type UpdateStripeBankingMutationResult = Apollo.MutationResult<UpdateStripeBankingMutation>;
export type UpdateStripeBankingMutationOptions = Apollo.BaseMutationOptions<UpdateStripeBankingMutation, UpdateStripeBankingMutationVariables>;
export const UpdateMerchantProfileDocument = gql`
    mutation UpdateMerchantProfile($phoneNumber: String, $displayName: String, $currency: String, $location: AddressInput, $merchantType: String) {
  updateMerchantProfile(
    phoneNumber: $phoneNumber
    displayName: $displayName
    currency: $currency
    location: $location
    merchantType: $merchantType
  ) {
    id
    merchantType
    displayName
    address {
      street
      streetAdditional
      city
      region
      postal
    }
    currency
    countryCode
    acceptsPayments
  }
}
    `;
export type UpdateMerchantProfileMutationFn = Apollo.MutationFunction<UpdateMerchantProfileMutation, UpdateMerchantProfileMutationVariables>;

/**
 * __useUpdateMerchantProfileMutation__
 *
 * To run a mutation, you first call `useUpdateMerchantProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMerchantProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMerchantProfileMutation, { data, loading, error }] = useUpdateMerchantProfileMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      displayName: // value for 'displayName'
 *      currency: // value for 'currency'
 *      location: // value for 'location'
 *      merchantType: // value for 'merchantType'
 *   },
 * });
 */
export function useUpdateMerchantProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMerchantProfileMutation, UpdateMerchantProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMerchantProfileMutation, UpdateMerchantProfileMutationVariables>(UpdateMerchantProfileDocument, options);
      }
export type UpdateMerchantProfileMutationHookResult = ReturnType<typeof useUpdateMerchantProfileMutation>;
export type UpdateMerchantProfileMutationResult = Apollo.MutationResult<UpdateMerchantProfileMutation>;
export type UpdateMerchantProfileMutationOptions = Apollo.BaseMutationOptions<UpdateMerchantProfileMutation, UpdateMerchantProfileMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation updateUserProfile($firstName: String, $lastName: String) {
  modifyUserProfile(firstName: $firstName, lastName: $lastName) {
    id
  }
}
    `;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const UpdateKycInfoDocument = gql`
    mutation updateKYCInfo($legalFirstName: String!, $legalLastName: String!, $address: AddressInput!, $individualSsn: String!, $dateOFBirth: BirthdayInput!, $govIdType: GovernmentIdInput!, $govIdFront: String!, $govIdBack: String) {
  enterKYCInfo(
    legalFirstName: $legalFirstName
    legalLastName: $legalLastName
    address: $address
    individualSsn: $individualSsn
    dateOFBirth: $dateOFBirth
    govIdType: $govIdType
    govIdFront: $govIdFront
    govIdBack: $govIdBack
  ) {
    confirmedUpload
    fields {
      name
      status
    }
    generalError
    persistanceError
  }
}
    `;
export type UpdateKycInfoMutationFn = Apollo.MutationFunction<UpdateKycInfoMutation, UpdateKycInfoMutationVariables>;

/**
 * __useUpdateKycInfoMutation__
 *
 * To run a mutation, you first call `useUpdateKycInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateKycInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateKycInfoMutation, { data, loading, error }] = useUpdateKycInfoMutation({
 *   variables: {
 *      legalFirstName: // value for 'legalFirstName'
 *      legalLastName: // value for 'legalLastName'
 *      address: // value for 'address'
 *      individualSsn: // value for 'individualSsn'
 *      dateOFBirth: // value for 'dateOFBirth'
 *      govIdType: // value for 'govIdType'
 *      govIdFront: // value for 'govIdFront'
 *      govIdBack: // value for 'govIdBack'
 *   },
 * });
 */
export function useUpdateKycInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateKycInfoMutation, UpdateKycInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateKycInfoMutation, UpdateKycInfoMutationVariables>(UpdateKycInfoDocument, options);
      }
export type UpdateKycInfoMutationHookResult = ReturnType<typeof useUpdateKycInfoMutation>;
export type UpdateKycInfoMutationResult = Apollo.MutationResult<UpdateKycInfoMutation>;
export type UpdateKycInfoMutationOptions = Apollo.BaseMutationOptions<UpdateKycInfoMutation, UpdateKycInfoMutationVariables>;
export const UpdateStripeAccountDocument = gql`
    mutation UpdateStripeAccount($persons: [StripeUpdatePersonFieldsInput], $business: StripeUpdateBusinessFieldsInput) {
  updateStripeAccount(persons: $persons, business: $business)
}
    `;
export type UpdateStripeAccountMutationFn = Apollo.MutationFunction<UpdateStripeAccountMutation, UpdateStripeAccountMutationVariables>;

/**
 * __useUpdateStripeAccountMutation__
 *
 * To run a mutation, you first call `useUpdateStripeAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStripeAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStripeAccountMutation, { data, loading, error }] = useUpdateStripeAccountMutation({
 *   variables: {
 *      persons: // value for 'persons'
 *      business: // value for 'business'
 *   },
 * });
 */
export function useUpdateStripeAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStripeAccountMutation, UpdateStripeAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStripeAccountMutation, UpdateStripeAccountMutationVariables>(UpdateStripeAccountDocument, options);
      }
export type UpdateStripeAccountMutationHookResult = ReturnType<typeof useUpdateStripeAccountMutation>;
export type UpdateStripeAccountMutationResult = Apollo.MutationResult<UpdateStripeAccountMutation>;
export type UpdateStripeAccountMutationOptions = Apollo.BaseMutationOptions<UpdateStripeAccountMutation, UpdateStripeAccountMutationVariables>;
export const AddBankingInfoDocument = gql`
    mutation AddBankingInfo($phoneNumber: String, $dob: BirthdayInput, $firstName: String, $lastName: String, $address: AddressInput, $accountType: String, $bankName: String, $bankAccountNickname: String, $accountNumber: String, $routingNumber: String, $clabe: String, $bsbNumber: String) {
  addBankingInfo(
    phoneNumber: $phoneNumber
    dob: $dob
    firstName: $firstName
    lastName: $lastName
    address: $address
    accountType: $accountType
    bankName: $bankName
    bankAccountNickname: $bankAccountNickname
    accountNumber: $accountNumber
    routingNumber: $routingNumber
    clabe: $clabe
    bsbNumber: $bsbNumber
  ) {
    id
    lastFour
    nickname
    country
    accountHolder
    account {
      id
      userName
    }
  }
}
    `;
export type AddBankingInfoMutationFn = Apollo.MutationFunction<AddBankingInfoMutation, AddBankingInfoMutationVariables>;

/**
 * __useAddBankingInfoMutation__
 *
 * To run a mutation, you first call `useAddBankingInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBankingInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBankingInfoMutation, { data, loading, error }] = useAddBankingInfoMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      dob: // value for 'dob'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      address: // value for 'address'
 *      accountType: // value for 'accountType'
 *      bankName: // value for 'bankName'
 *      bankAccountNickname: // value for 'bankAccountNickname'
 *      accountNumber: // value for 'accountNumber'
 *      routingNumber: // value for 'routingNumber'
 *      clabe: // value for 'clabe'
 *      bsbNumber: // value for 'bsbNumber'
 *   },
 * });
 */
export function useAddBankingInfoMutation(baseOptions?: Apollo.MutationHookOptions<AddBankingInfoMutation, AddBankingInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBankingInfoMutation, AddBankingInfoMutationVariables>(AddBankingInfoDocument, options);
      }
export type AddBankingInfoMutationHookResult = ReturnType<typeof useAddBankingInfoMutation>;
export type AddBankingInfoMutationResult = Apollo.MutationResult<AddBankingInfoMutation>;
export type AddBankingInfoMutationOptions = Apollo.BaseMutationOptions<AddBankingInfoMutation, AddBankingInfoMutationVariables>;
export const ConfirmQuoteDocument = gql`
    mutation confirmQuote($quoteId: String) {
  confirmQuote(quoteId: $quoteId) {
    destinationAmount
    destinationCurrency
    destinationCurrencyCode
    transactionId
    email
  }
}
    `;
export type ConfirmQuoteMutationFn = Apollo.MutationFunction<ConfirmQuoteMutation, ConfirmQuoteMutationVariables>;

/**
 * __useConfirmQuoteMutation__
 *
 * To run a mutation, you first call `useConfirmQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmQuoteMutation, { data, loading, error }] = useConfirmQuoteMutation({
 *   variables: {
 *      quoteId: // value for 'quoteId'
 *   },
 * });
 */
export function useConfirmQuoteMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmQuoteMutation, ConfirmQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmQuoteMutation, ConfirmQuoteMutationVariables>(ConfirmQuoteDocument, options);
      }
export type ConfirmQuoteMutationHookResult = ReturnType<typeof useConfirmQuoteMutation>;
export type ConfirmQuoteMutationResult = Apollo.MutationResult<ConfirmQuoteMutation>;
export type ConfirmQuoteMutationOptions = Apollo.BaseMutationOptions<ConfirmQuoteMutation, ConfirmQuoteMutationVariables>;
export const DeleteBankDocument = gql`
    mutation deleteBank($bankId: String) {
  deleteBank(bankId: $bankId)
}
    `;
export type DeleteBankMutationFn = Apollo.MutationFunction<DeleteBankMutation, DeleteBankMutationVariables>;

/**
 * __useDeleteBankMutation__
 *
 * To run a mutation, you first call `useDeleteBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBankMutation, { data, loading, error }] = useDeleteBankMutation({
 *   variables: {
 *      bankId: // value for 'bankId'
 *   },
 * });
 */
export function useDeleteBankMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBankMutation, DeleteBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBankMutation, DeleteBankMutationVariables>(DeleteBankDocument, options);
      }
export type DeleteBankMutationHookResult = ReturnType<typeof useDeleteBankMutation>;
export type DeleteBankMutationResult = Apollo.MutationResult<DeleteBankMutation>;
export type DeleteBankMutationOptions = Apollo.BaseMutationOptions<DeleteBankMutation, DeleteBankMutationVariables>;
export const GetAccountsByGeomDocument = gql`
    query getAccountsByGeom($geom: GeometricSearchInput) {
  searchAccountsByGeom(geom: $geom) {
    id
    displayName
    userName
    image
    merchantProfileDetails {
      geom
      acceptsPayments
    }
  }
}
    `;

/**
 * __useGetAccountsByGeomQuery__
 *
 * To run a query within a React component, call `useGetAccountsByGeomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountsByGeomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountsByGeomQuery({
 *   variables: {
 *      geom: // value for 'geom'
 *   },
 * });
 */
export function useGetAccountsByGeomQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountsByGeomQuery, GetAccountsByGeomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountsByGeomQuery, GetAccountsByGeomQueryVariables>(GetAccountsByGeomDocument, options);
      }
export function useGetAccountsByGeomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountsByGeomQuery, GetAccountsByGeomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountsByGeomQuery, GetAccountsByGeomQueryVariables>(GetAccountsByGeomDocument, options);
        }
export type GetAccountsByGeomQueryHookResult = ReturnType<typeof useGetAccountsByGeomQuery>;
export type GetAccountsByGeomLazyQueryHookResult = ReturnType<typeof useGetAccountsByGeomLazyQuery>;
export type GetAccountsByGeomQueryResult = Apollo.QueryResult<GetAccountsByGeomQuery, GetAccountsByGeomQueryVariables>;
export const GetassethistoryDocument = gql`
    query GETASSETHISTORY($assetName: String, $period: MarketPeriodInput) {
  getAssetHistory(period: $period, assetName: $assetName) {
    asset {
      name
      code
    }
    minPrice
    maxPrice
    firstValidPointIndex
    start
    end
    history {
      time
      price
    }
  }
}
    `;

/**
 * __useGetassethistoryQuery__
 *
 * To run a query within a React component, call `useGetassethistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetassethistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetassethistoryQuery({
 *   variables: {
 *      assetName: // value for 'assetName'
 *      period: // value for 'period'
 *   },
 * });
 */
export function useGetassethistoryQuery(baseOptions?: Apollo.QueryHookOptions<GetassethistoryQuery, GetassethistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetassethistoryQuery, GetassethistoryQueryVariables>(GetassethistoryDocument, options);
      }
export function useGetassethistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetassethistoryQuery, GetassethistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetassethistoryQuery, GetassethistoryQueryVariables>(GetassethistoryDocument, options);
        }
export type GetassethistoryQueryHookResult = ReturnType<typeof useGetassethistoryQuery>;
export type GetassethistoryLazyQueryHookResult = ReturnType<typeof useGetassethistoryLazyQuery>;
export type GetassethistoryQueryResult = Apollo.QueryResult<GetassethistoryQuery, GetassethistoryQueryVariables>;
export const GetassetmetricDocument = gql`
    query GETASSETMETRIC($assetName: String) {
  getAssetMetrics(assetName: $assetName) {
    name
    code
    logoImage
    price
  }
}
    `;

/**
 * __useGetassetmetricQuery__
 *
 * To run a query within a React component, call `useGetassetmetricQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetassetmetricQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetassetmetricQuery({
 *   variables: {
 *      assetName: // value for 'assetName'
 *   },
 * });
 */
export function useGetassetmetricQuery(baseOptions?: Apollo.QueryHookOptions<GetassetmetricQuery, GetassetmetricQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetassetmetricQuery, GetassetmetricQueryVariables>(GetassetmetricDocument, options);
      }
export function useGetassetmetricLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetassetmetricQuery, GetassetmetricQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetassetmetricQuery, GetassetmetricQueryVariables>(GetassetmetricDocument, options);
        }
export type GetassetmetricQueryHookResult = ReturnType<typeof useGetassetmetricQuery>;
export type GetassetmetricLazyQueryHookResult = ReturnType<typeof useGetassetmetricLazyQuery>;
export type GetassetmetricQueryResult = Apollo.QueryResult<GetassetmetricQuery, GetassetmetricQueryVariables>;
export const GetMyMerchantProfileDocument = gql`
    query GetMyMerchantProfile {
  myMerchantProfile {
    id
    displayName
    merchantType
    currency
    address {
      street
      streetAdditional
      city
      region
      postal
    }
    country {
      name
      alpha2
    }
    acceptsPayments
    countryCode
    payoutsEnabled
    businessDetails {
      type
      hasBanking
      hasOnboarded
    }
  }
}
    `;

/**
 * __useGetMyMerchantProfileQuery__
 *
 * To run a query within a React component, call `useGetMyMerchantProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyMerchantProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyMerchantProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyMerchantProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetMyMerchantProfileQuery, GetMyMerchantProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyMerchantProfileQuery, GetMyMerchantProfileQueryVariables>(GetMyMerchantProfileDocument, options);
      }
export function useGetMyMerchantProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyMerchantProfileQuery, GetMyMerchantProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyMerchantProfileQuery, GetMyMerchantProfileQueryVariables>(GetMyMerchantProfileDocument, options);
        }
export type GetMyMerchantProfileQueryHookResult = ReturnType<typeof useGetMyMerchantProfileQuery>;
export type GetMyMerchantProfileLazyQueryHookResult = ReturnType<typeof useGetMyMerchantProfileLazyQuery>;
export type GetMyMerchantProfileQueryResult = Apollo.QueryResult<GetMyMerchantProfileQuery, GetMyMerchantProfileQueryVariables>;
export const GetOrderDocument = gql`
    query GetOrder($orderId: String!, $merchantId: String!) {
  paymentMethods {
    id
    name
    lastFour
    type
    expirationDate
    cardBrand {
      id
      image
      display
    }
  }
  getOrder(orderId: $orderId, merchantId: $merchantId) {
    orderId
    eventId
    orderTotal {
      value
      display
    }
    orderFees {
      value
      display
    }
    orderSubtotal {
      value
      display
    }
    paymentEntered
    timeRemainingInSecs
    tickets {
      id
      type
      subtotalPrice {
        value
        display
        major
      }
      price {
        value
        display
        major
      }
      quantity
    }
  }
}
    `;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      merchantId: // value for 'merchantId'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const GetPaymentMethodDocument = gql`
    query GetPaymentMethod($id: String!) {
  paymentMethod: getSinglePaymentMethod(pmId: $id) {
    id
    lastFour
    cardBrand {
      id
      display
      image
    }
    type
    expirationDate
    name
    streetAddress
    streetAdditional
    cityAddress
    PostalAddress
    country
    region
  }
}
    `;

/**
 * __useGetPaymentMethodQuery__
 *
 * To run a query within a React component, call `useGetPaymentMethodQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentMethodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentMethodQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPaymentMethodQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentMethodQuery, GetPaymentMethodQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentMethodQuery, GetPaymentMethodQueryVariables>(GetPaymentMethodDocument, options);
      }
export function useGetPaymentMethodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentMethodQuery, GetPaymentMethodQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentMethodQuery, GetPaymentMethodQueryVariables>(GetPaymentMethodDocument, options);
        }
export type GetPaymentMethodQueryHookResult = ReturnType<typeof useGetPaymentMethodQuery>;
export type GetPaymentMethodLazyQueryHookResult = ReturnType<typeof useGetPaymentMethodLazyQuery>;
export type GetPaymentMethodQueryResult = Apollo.QueryResult<GetPaymentMethodQuery, GetPaymentMethodQueryVariables>;
export const GetTransactionDocument = gql`
    query GetTransaction($id: String!) {
  transaction(transactionId: $id) {
    id
    sender {
      id
      image
      userName
      displayName
    }
    receiver {
      id
      userName
      displayName
      image
    }
    dateOfTransaction
    amount
    tipAmount {
      major
      value
      display
    }
    total {
      major
      value
      display
    }
    currency
    txDetail
    isRefunded
  }
}
    `;

/**
 * __useGetTransactionQuery__
 *
 * To run a query within a React component, call `useGetTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTransactionQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
      }
export function useGetTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
        }
export type GetTransactionQueryHookResult = ReturnType<typeof useGetTransactionQuery>;
export type GetTransactionLazyQueryHookResult = ReturnType<typeof useGetTransactionLazyQuery>;
export type GetTransactionQueryResult = Apollo.QueryResult<GetTransactionQuery, GetTransactionQueryVariables>;
export const GetTransactionsDocument = gql`
    query GetTransactions($limit: Int, $page: Int) {
  getTransactions(limit: $limit, page: $page) {
    pageInfo {
      currentPage
      totalPages
      totalCount
      perPage
    }
    nodes {
      origin {
        userName
      }
      id
      amount
      currency
      transactionType
      dateOfTransaction
      total {
        major
        value
        display
      }
      destination {
        id
        userName
        displayName
        image
      }
    }
  }
}
    `;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
      }
export function useGetTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetTransactionsToMeDocument = gql`
    query GetTransactionsToMe($limit: Int, $page: Int) {
  transactionsToMe(limit: $limit, page: $page) {
    pageInfo {
      currentPage
      totalPages
      totalCount
      perPage
    }
    nodes {
      id
      amount
      total {
        major
        value
        display
      }
      currency
      transactionType
      dateOfTransaction
      origin {
        id
        userName
        displayName
        image
      }
    }
  }
}
    `;

/**
 * __useGetTransactionsToMeQuery__
 *
 * To run a query within a React component, call `useGetTransactionsToMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsToMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsToMeQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetTransactionsToMeQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionsToMeQuery, GetTransactionsToMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsToMeQuery, GetTransactionsToMeQueryVariables>(GetTransactionsToMeDocument, options);
      }
export function useGetTransactionsToMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsToMeQuery, GetTransactionsToMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsToMeQuery, GetTransactionsToMeQueryVariables>(GetTransactionsToMeDocument, options);
        }
export type GetTransactionsToMeQueryHookResult = ReturnType<typeof useGetTransactionsToMeQuery>;
export type GetTransactionsToMeLazyQueryHookResult = ReturnType<typeof useGetTransactionsToMeLazyQuery>;
export type GetTransactionsToMeQueryResult = Apollo.QueryResult<GetTransactionsToMeQuery, GetTransactionsToMeQueryVariables>;
export const GetAchQuoteDocument = gql`
    query GetACHQuote($quoteId: String, $destinationAssetCode: String) {
  destinationAsset: assetMetrics(assetName: $destinationAssetCode) {
    price
  }
  quote: getACHQuote(quoteId: $quoteId) {
    paymentName
    sourceCurrency
    sourceCurrencyCode
    sourceAmount
    destinationCurrency
    destinationCurrencyCode
    destinationAmount
    sourceFee
    exchangeRate
    notes
    logoImage
    fiatFees
    fiatAmount
    fiatCurrencyCode
    destination
    isInternal
  }
}
    `;

/**
 * __useGetAchQuoteQuery__
 *
 * To run a query within a React component, call `useGetAchQuoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAchQuoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAchQuoteQuery({
 *   variables: {
 *      quoteId: // value for 'quoteId'
 *      destinationAssetCode: // value for 'destinationAssetCode'
 *   },
 * });
 */
export function useGetAchQuoteQuery(baseOptions?: Apollo.QueryHookOptions<GetAchQuoteQuery, GetAchQuoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAchQuoteQuery, GetAchQuoteQueryVariables>(GetAchQuoteDocument, options);
      }
export function useGetAchQuoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAchQuoteQuery, GetAchQuoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAchQuoteQuery, GetAchQuoteQueryVariables>(GetAchQuoteDocument, options);
        }
export type GetAchQuoteQueryHookResult = ReturnType<typeof useGetAchQuoteQuery>;
export type GetAchQuoteLazyQueryHookResult = ReturnType<typeof useGetAchQuoteLazyQuery>;
export type GetAchQuoteQueryResult = Apollo.QueryResult<GetAchQuoteQuery, GetAchQuoteQueryVariables>;
export const GetAccountByIdDocument = gql`
    query getAccountById($id: String!) {
  accountById(id: $id) {
    userName
    hasMultipleAccounts
    isMerchant
    isPrivate
    hasMerchantAccount
    displayName
    phone
    city
    kycNeeded
    kycStatus {
      status
      requirements
    }
    country {
      name
      alpha2
      currencyCode
    }
    image
    id
    qr {
      image
      code
    }
    creationMethod
    merchantProfileDetails {
      id
      acceptsPayments
      payoutsEnabled
      capabilities
      currency
      geom
      merchantType
      address {
        street
        streetAdditional
        city
        region
        postal
      }
      country {
        name
        alpha2
      }
      status
      businessDetails {
        type
        hasBanking
        hasOnboarded
        chargesEnabled
        payoutsEnabled
        pastDueRequirements
        currentlyDueRequirements
        requirementsDueDate
      }
    }
    averageRating
    reviews {
      pageInfo {
        totalCount
      }
    }
    transactions {
      pageInfo {
        totalCount
      }
    }
  }
}
    `;

/**
 * __useGetAccountByIdQuery__
 *
 * To run a query within a React component, call `useGetAccountByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAccountByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAccountByIdQuery, GetAccountByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountByIdQuery, GetAccountByIdQueryVariables>(GetAccountByIdDocument, options);
      }
export function useGetAccountByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountByIdQuery, GetAccountByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountByIdQuery, GetAccountByIdQueryVariables>(GetAccountByIdDocument, options);
        }
export type GetAccountByIdQueryHookResult = ReturnType<typeof useGetAccountByIdQuery>;
export type GetAccountByIdLazyQueryHookResult = ReturnType<typeof useGetAccountByIdLazyQuery>;
export type GetAccountByIdQueryResult = Apollo.QueryResult<GetAccountByIdQuery, GetAccountByIdQueryVariables>;
export const GetAllArticlesDocument = gql`
    query GetAllArticles($ticker: String) {
  allArticles(ticker: $ticker) {
    title
    url
    text
    sourceName
    tickers
    topics
    createdOn {
      date
    }
    imageUrl
  }
}
    `;

/**
 * __useGetAllArticlesQuery__
 *
 * To run a query within a React component, call `useGetAllArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllArticlesQuery({
 *   variables: {
 *      ticker: // value for 'ticker'
 *   },
 * });
 */
export function useGetAllArticlesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllArticlesQuery, GetAllArticlesQueryVariables>(GetAllArticlesDocument, options);
      }
export function useGetAllArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllArticlesQuery, GetAllArticlesQueryVariables>(GetAllArticlesDocument, options);
        }
export type GetAllArticlesQueryHookResult = ReturnType<typeof useGetAllArticlesQuery>;
export type GetAllArticlesLazyQueryHookResult = ReturnType<typeof useGetAllArticlesLazyQuery>;
export type GetAllArticlesQueryResult = Apollo.QueryResult<GetAllArticlesQuery, GetAllArticlesQueryVariables>;
export const GetAllPortfolioDocument = gql`
    query getAllPortfolio {
  getetxPortfolio {
    totalFiatBalance
    fiatCurrencyCode
    lastRebalancingOn
    portfolio {
      logoImage
      cryptoAmount
      currencyName
      currency
      fiatAmount
      fiatCurrency
      amountPer
    }
  }
}
    `;

/**
 * __useGetAllPortfolioQuery__
 *
 * To run a query within a React component, call `useGetAllPortfolioQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPortfolioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPortfolioQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPortfolioQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPortfolioQuery, GetAllPortfolioQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPortfolioQuery, GetAllPortfolioQueryVariables>(GetAllPortfolioDocument, options);
      }
export function useGetAllPortfolioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPortfolioQuery, GetAllPortfolioQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPortfolioQuery, GetAllPortfolioQueryVariables>(GetAllPortfolioDocument, options);
        }
export type GetAllPortfolioQueryHookResult = ReturnType<typeof useGetAllPortfolioQuery>;
export type GetAllPortfolioLazyQueryHookResult = ReturnType<typeof useGetAllPortfolioLazyQuery>;
export type GetAllPortfolioQueryResult = Apollo.QueryResult<GetAllPortfolioQuery, GetAllPortfolioQueryVariables>;
export const GetAvailablePaymentProvidersDocument = gql`
    query GetAvailablePaymentProviders {
  availableProviders {
    provider
    available
  }
}
    `;

/**
 * __useGetAvailablePaymentProvidersQuery__
 *
 * To run a query within a React component, call `useGetAvailablePaymentProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailablePaymentProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailablePaymentProvidersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAvailablePaymentProvidersQuery(baseOptions?: Apollo.QueryHookOptions<GetAvailablePaymentProvidersQuery, GetAvailablePaymentProvidersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAvailablePaymentProvidersQuery, GetAvailablePaymentProvidersQueryVariables>(GetAvailablePaymentProvidersDocument, options);
      }
export function useGetAvailablePaymentProvidersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAvailablePaymentProvidersQuery, GetAvailablePaymentProvidersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAvailablePaymentProvidersQuery, GetAvailablePaymentProvidersQueryVariables>(GetAvailablePaymentProvidersDocument, options);
        }
export type GetAvailablePaymentProvidersQueryHookResult = ReturnType<typeof useGetAvailablePaymentProvidersQuery>;
export type GetAvailablePaymentProvidersLazyQueryHookResult = ReturnType<typeof useGetAvailablePaymentProvidersLazyQuery>;
export type GetAvailablePaymentProvidersQueryResult = Apollo.QueryResult<GetAvailablePaymentProvidersQuery, GetAvailablePaymentProvidersQueryVariables>;
export const GetBlocksDocument = gql`
    query GetBlocks {
  getBlocks {
    blocks {
      threeMonth
      sixMonth
      twelveMonth
      name
      link
    }
  }
}
    `;

/**
 * __useGetBlocksQuery__
 *
 * To run a query within a React component, call `useGetBlocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlocksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBlocksQuery(baseOptions?: Apollo.QueryHookOptions<GetBlocksQuery, GetBlocksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlocksQuery, GetBlocksQueryVariables>(GetBlocksDocument, options);
      }
export function useGetBlocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlocksQuery, GetBlocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlocksQuery, GetBlocksQueryVariables>(GetBlocksDocument, options);
        }
export type GetBlocksQueryHookResult = ReturnType<typeof useGetBlocksQuery>;
export type GetBlocksLazyQueryHookResult = ReturnType<typeof useGetBlocksLazyQuery>;
export type GetBlocksQueryResult = Apollo.QueryResult<GetBlocksQuery, GetBlocksQueryVariables>;
export const GetCarouselItemsDocument = gql`
    query GetCarouselItems {
  getCarouselAssets {
    type
    src
    content
    link
    poster
  }
}
    `;

/**
 * __useGetCarouselItemsQuery__
 *
 * To run a query within a React component, call `useGetCarouselItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarouselItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarouselItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCarouselItemsQuery(baseOptions?: Apollo.QueryHookOptions<GetCarouselItemsQuery, GetCarouselItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarouselItemsQuery, GetCarouselItemsQueryVariables>(GetCarouselItemsDocument, options);
      }
export function useGetCarouselItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarouselItemsQuery, GetCarouselItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarouselItemsQuery, GetCarouselItemsQueryVariables>(GetCarouselItemsDocument, options);
        }
export type GetCarouselItemsQueryHookResult = ReturnType<typeof useGetCarouselItemsQuery>;
export type GetCarouselItemsLazyQueryHookResult = ReturnType<typeof useGetCarouselItemsLazyQuery>;
export type GetCarouselItemsQueryResult = Apollo.QueryResult<GetCarouselItemsQuery, GetCarouselItemsQueryVariables>;
export const GetCoinSwapAssetsDocument = gql`
    query GetCoinSwapAssets($quoteId: String, $sourceAssetCode: String, $destinationAssetCode: String) {
  sourceAsset: assetMetrics(assetName: $sourceAssetCode) {
    price
  }
  destinationAsset: assetMetrics(assetName: $destinationAssetCode) {
    price
  }
  quote: getQuote(quoteId: $quoteId) {
    sourceCurrency
    sourceCurrencyCode
    sourceAmount
    destinationCurrency
    destinationCurrencyCode
    destinationAmount
    sourceFee
    fiatCurrencyCode
  }
}
    `;

/**
 * __useGetCoinSwapAssetsQuery__
 *
 * To run a query within a React component, call `useGetCoinSwapAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoinSwapAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoinSwapAssetsQuery({
 *   variables: {
 *      quoteId: // value for 'quoteId'
 *      sourceAssetCode: // value for 'sourceAssetCode'
 *      destinationAssetCode: // value for 'destinationAssetCode'
 *   },
 * });
 */
export function useGetCoinSwapAssetsQuery(baseOptions?: Apollo.QueryHookOptions<GetCoinSwapAssetsQuery, GetCoinSwapAssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoinSwapAssetsQuery, GetCoinSwapAssetsQueryVariables>(GetCoinSwapAssetsDocument, options);
      }
export function useGetCoinSwapAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoinSwapAssetsQuery, GetCoinSwapAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoinSwapAssetsQuery, GetCoinSwapAssetsQueryVariables>(GetCoinSwapAssetsDocument, options);
        }
export type GetCoinSwapAssetsQueryHookResult = ReturnType<typeof useGetCoinSwapAssetsQuery>;
export type GetCoinSwapAssetsLazyQueryHookResult = ReturnType<typeof useGetCoinSwapAssetsLazyQuery>;
export type GetCoinSwapAssetsQueryResult = Apollo.QueryResult<GetCoinSwapAssetsQuery, GetCoinSwapAssetsQueryVariables>;
export const GetCryptoAssetMetricsDocument = gql`
    query GetCryptoAssetMetrics($assetName: String!) {
  getAssetMetrics(assetName: $assetName) {
    name
    code
    price
    currency
    logoImage
  }
}
    `;

/**
 * __useGetCryptoAssetMetricsQuery__
 *
 * To run a query within a React component, call `useGetCryptoAssetMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCryptoAssetMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCryptoAssetMetricsQuery({
 *   variables: {
 *      assetName: // value for 'assetName'
 *   },
 * });
 */
export function useGetCryptoAssetMetricsQuery(baseOptions: Apollo.QueryHookOptions<GetCryptoAssetMetricsQuery, GetCryptoAssetMetricsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCryptoAssetMetricsQuery, GetCryptoAssetMetricsQueryVariables>(GetCryptoAssetMetricsDocument, options);
      }
export function useGetCryptoAssetMetricsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCryptoAssetMetricsQuery, GetCryptoAssetMetricsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCryptoAssetMetricsQuery, GetCryptoAssetMetricsQueryVariables>(GetCryptoAssetMetricsDocument, options);
        }
export type GetCryptoAssetMetricsQueryHookResult = ReturnType<typeof useGetCryptoAssetMetricsQuery>;
export type GetCryptoAssetMetricsLazyQueryHookResult = ReturnType<typeof useGetCryptoAssetMetricsLazyQuery>;
export type GetCryptoAssetMetricsQueryResult = Apollo.QueryResult<GetCryptoAssetMetricsQuery, GetCryptoAssetMetricsQueryVariables>;
export const GetCryptoBuySuccessDataDocument = gql`
    query GetCryptoBuySuccessData($orderId: String, $assetCode: String) {
  asset: assetMetrics(assetName: $assetCode) {
    name
    logoImage
  }
  order: getFullOrder(orderId: $orderId, assetName: $assetCode) {
    purchaseAmount
    destinationAmount
    sourceCurrency
  }
}
    `;

/**
 * __useGetCryptoBuySuccessDataQuery__
 *
 * To run a query within a React component, call `useGetCryptoBuySuccessDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCryptoBuySuccessDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCryptoBuySuccessDataQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      assetCode: // value for 'assetCode'
 *   },
 * });
 */
export function useGetCryptoBuySuccessDataQuery(baseOptions?: Apollo.QueryHookOptions<GetCryptoBuySuccessDataQuery, GetCryptoBuySuccessDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCryptoBuySuccessDataQuery, GetCryptoBuySuccessDataQueryVariables>(GetCryptoBuySuccessDataDocument, options);
      }
export function useGetCryptoBuySuccessDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCryptoBuySuccessDataQuery, GetCryptoBuySuccessDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCryptoBuySuccessDataQuery, GetCryptoBuySuccessDataQueryVariables>(GetCryptoBuySuccessDataDocument, options);
        }
export type GetCryptoBuySuccessDataQueryHookResult = ReturnType<typeof useGetCryptoBuySuccessDataQuery>;
export type GetCryptoBuySuccessDataLazyQueryHookResult = ReturnType<typeof useGetCryptoBuySuccessDataLazyQuery>;
export type GetCryptoBuySuccessDataQueryResult = Apollo.QueryResult<GetCryptoBuySuccessDataQuery, GetCryptoBuySuccessDataQueryVariables>;
export const GetCryptoCardOrderReservationDocument = gql`
    query GetCryptoCardOrderReservation($reservationId: String, $paymentMethodId: String, $assetCode: String) {
  asset: getAssetMetrics(assetName: $assetCode) {
    price
  }
  paymentMethod: getSinglePaymentMethod(pmId: $paymentMethodId) {
    id
    lastFour
    cardBrand {
      id
      display
      image
    }
  }
  reservation: getCardOrderReservation(
    reservationId: $reservationId
    assetName: $assetCode
  ) {
    reservationId
    exchangeRate
    sourceAmount
    sourceCurrency
    destinationCurrency
    destinationAmount
    fees {
      currencyName
      feeAmount
    }
  }
}
    `;

/**
 * __useGetCryptoCardOrderReservationQuery__
 *
 * To run a query within a React component, call `useGetCryptoCardOrderReservationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCryptoCardOrderReservationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCryptoCardOrderReservationQuery({
 *   variables: {
 *      reservationId: // value for 'reservationId'
 *      paymentMethodId: // value for 'paymentMethodId'
 *      assetCode: // value for 'assetCode'
 *   },
 * });
 */
export function useGetCryptoCardOrderReservationQuery(baseOptions?: Apollo.QueryHookOptions<GetCryptoCardOrderReservationQuery, GetCryptoCardOrderReservationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCryptoCardOrderReservationQuery, GetCryptoCardOrderReservationQueryVariables>(GetCryptoCardOrderReservationDocument, options);
      }
export function useGetCryptoCardOrderReservationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCryptoCardOrderReservationQuery, GetCryptoCardOrderReservationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCryptoCardOrderReservationQuery, GetCryptoCardOrderReservationQueryVariables>(GetCryptoCardOrderReservationDocument, options);
        }
export type GetCryptoCardOrderReservationQueryHookResult = ReturnType<typeof useGetCryptoCardOrderReservationQuery>;
export type GetCryptoCardOrderReservationLazyQueryHookResult = ReturnType<typeof useGetCryptoCardOrderReservationLazyQuery>;
export type GetCryptoCardOrderReservationQueryResult = Apollo.QueryResult<GetCryptoCardOrderReservationQuery, GetCryptoCardOrderReservationQueryVariables>;
export const GetCryptoMarketListDocument = gql`
    query GetCryptoMarketList($interestOnly: Boolean, $type: String) {
  getMarketList(interestOnly: $interestOnly, type: $type) {
    assets {
      name
      code
      price
      currency
      logoImage
      percentChangeOverPeriod
    }
  }
}
    `;

/**
 * __useGetCryptoMarketListQuery__
 *
 * To run a query within a React component, call `useGetCryptoMarketListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCryptoMarketListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCryptoMarketListQuery({
 *   variables: {
 *      interestOnly: // value for 'interestOnly'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetCryptoMarketListQuery(baseOptions?: Apollo.QueryHookOptions<GetCryptoMarketListQuery, GetCryptoMarketListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCryptoMarketListQuery, GetCryptoMarketListQueryVariables>(GetCryptoMarketListDocument, options);
      }
export function useGetCryptoMarketListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCryptoMarketListQuery, GetCryptoMarketListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCryptoMarketListQuery, GetCryptoMarketListQueryVariables>(GetCryptoMarketListDocument, options);
        }
export type GetCryptoMarketListQueryHookResult = ReturnType<typeof useGetCryptoMarketListQuery>;
export type GetCryptoMarketListLazyQueryHookResult = ReturnType<typeof useGetCryptoMarketListLazyQuery>;
export type GetCryptoMarketListQueryResult = Apollo.QueryResult<GetCryptoMarketListQuery, GetCryptoMarketListQueryVariables>;
export const GetCryptoPurchaseMethodsDocument = gql`
    query GetCryptoPurchaseMethods($purchaseAmount: String, $purchaseCurrency: String) {
  assets: myAssetsEnoughToPurchase(
    purchaseAmount: $purchaseAmount
    purchaseCurrency: $purchaseCurrency
  ) {
    name
    code
    logoImage
    amount
    fiatAmount {
      value
      major
      display
    }
  }
  cards: paymentMethods {
    id
    name
    lastFour
    region
    type
    expirationDate
    cardBrand {
      id
      image
      display
    }
  }
  banks: paymentMethods(type: ACH) {
    id
    name
    type
    lastFour
    region
    status
    cardBrand {
      id
      image
      display
    }
  }
}
    `;

/**
 * __useGetCryptoPurchaseMethodsQuery__
 *
 * To run a query within a React component, call `useGetCryptoPurchaseMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCryptoPurchaseMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCryptoPurchaseMethodsQuery({
 *   variables: {
 *      purchaseAmount: // value for 'purchaseAmount'
 *      purchaseCurrency: // value for 'purchaseCurrency'
 *   },
 * });
 */
export function useGetCryptoPurchaseMethodsQuery(baseOptions?: Apollo.QueryHookOptions<GetCryptoPurchaseMethodsQuery, GetCryptoPurchaseMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCryptoPurchaseMethodsQuery, GetCryptoPurchaseMethodsQueryVariables>(GetCryptoPurchaseMethodsDocument, options);
      }
export function useGetCryptoPurchaseMethodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCryptoPurchaseMethodsQuery, GetCryptoPurchaseMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCryptoPurchaseMethodsQuery, GetCryptoPurchaseMethodsQueryVariables>(GetCryptoPurchaseMethodsDocument, options);
        }
export type GetCryptoPurchaseMethodsQueryHookResult = ReturnType<typeof useGetCryptoPurchaseMethodsQuery>;
export type GetCryptoPurchaseMethodsLazyQueryHookResult = ReturnType<typeof useGetCryptoPurchaseMethodsLazyQuery>;
export type GetCryptoPurchaseMethodsQueryResult = Apollo.QueryResult<GetCryptoPurchaseMethodsQuery, GetCryptoPurchaseMethodsQueryVariables>;
export const GetRecentCryptoTransactionsDocument = gql`
    query GetRecentCryptoTransactions($seeAll: Boolean, $transactionCategory: String, $asset: String) {
  getRecentTransactions(
    seeAll: $seeAll
    transactionCategory: $transactionCategory
    asset: $asset
  ) {
    asset
    amount
    date
    coin {
      name
      logoImage
      code
    }
    category
    fiatCurrency
    status
    fiatAmount {
      display
      major
    }
    assetName
    swappedAsset
    swappedAssetName
    receiver {
      id
      userName
      displayName
      image
    }
    sender {
      id
      userName
      displayName
      image
    }
  }
}
    `;

/**
 * __useGetRecentCryptoTransactionsQuery__
 *
 * To run a query within a React component, call `useGetRecentCryptoTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentCryptoTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentCryptoTransactionsQuery({
 *   variables: {
 *      seeAll: // value for 'seeAll'
 *      transactionCategory: // value for 'transactionCategory'
 *      asset: // value for 'asset'
 *   },
 * });
 */
export function useGetRecentCryptoTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentCryptoTransactionsQuery, GetRecentCryptoTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentCryptoTransactionsQuery, GetRecentCryptoTransactionsQueryVariables>(GetRecentCryptoTransactionsDocument, options);
      }
export function useGetRecentCryptoTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentCryptoTransactionsQuery, GetRecentCryptoTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentCryptoTransactionsQuery, GetRecentCryptoTransactionsQueryVariables>(GetRecentCryptoTransactionsDocument, options);
        }
export type GetRecentCryptoTransactionsQueryHookResult = ReturnType<typeof useGetRecentCryptoTransactionsQuery>;
export type GetRecentCryptoTransactionsLazyQueryHookResult = ReturnType<typeof useGetRecentCryptoTransactionsLazyQuery>;
export type GetRecentCryptoTransactionsQueryResult = Apollo.QueryResult<GetRecentCryptoTransactionsQuery, GetRecentCryptoTransactionsQueryVariables>;
export const GetEtxHistoryDocument = gql`
    query GetEtxHistory {
  getEtxHistory {
    Month
    sixMonth
    twelveMonth
  }
}
    `;

/**
 * __useGetEtxHistoryQuery__
 *
 * To run a query within a React component, call `useGetEtxHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEtxHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEtxHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEtxHistoryQuery(baseOptions?: Apollo.QueryHookOptions<GetEtxHistoryQuery, GetEtxHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEtxHistoryQuery, GetEtxHistoryQueryVariables>(GetEtxHistoryDocument, options);
      }
export function useGetEtxHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEtxHistoryQuery, GetEtxHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEtxHistoryQuery, GetEtxHistoryQueryVariables>(GetEtxHistoryDocument, options);
        }
export type GetEtxHistoryQueryHookResult = ReturnType<typeof useGetEtxHistoryQuery>;
export type GetEtxHistoryLazyQueryHookResult = ReturnType<typeof useGetEtxHistoryLazyQuery>;
export type GetEtxHistoryQueryResult = Apollo.QueryResult<GetEtxHistoryQuery, GetEtxHistoryQueryVariables>;
export const GetEtxProductDocument = gql`
    query getEtxProduct {
  getEtxProduct {
    name
    etxKey
    logoImage
    distribution {
      name
      code
      image
      percentage
    }
  }
}
    `;

/**
 * __useGetEtxProductQuery__
 *
 * To run a query within a React component, call `useGetEtxProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEtxProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEtxProductQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEtxProductQuery(baseOptions?: Apollo.QueryHookOptions<GetEtxProductQuery, GetEtxProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEtxProductQuery, GetEtxProductQueryVariables>(GetEtxProductDocument, options);
      }
export function useGetEtxProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEtxProductQuery, GetEtxProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEtxProductQuery, GetEtxProductQueryVariables>(GetEtxProductDocument, options);
        }
export type GetEtxProductQueryHookResult = ReturnType<typeof useGetEtxProductQuery>;
export type GetEtxProductLazyQueryHookResult = ReturnType<typeof useGetEtxProductLazyQuery>;
export type GetEtxProductQueryResult = Apollo.QueryResult<GetEtxProductQuery, GetEtxProductQueryVariables>;
export const GetEventDocument = gql`
    query getEvent($merchantId: String, $platformEventId: String, $venuePlatformId: String) {
  getEvent(
    merchantId: $merchantId
    platformEventId: $platformEventId
    venuePlatformId: $venuePlatformId
  ) {
    eventInfo {
      id
      title
      dateTime
      description
      artists
      type
      isOnline
      imageUrl
    }
    ticketDetails {
      id
      type
      currency
      price {
        value
        display
        major
      }
      status
      minimumPerOrder
      maximumPerOrder
      saleStart
      saleEnd
    }
  }
}
    `;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      merchantId: // value for 'merchantId'
 *      platformEventId: // value for 'platformEventId'
 *      venuePlatformId: // value for 'venuePlatformId'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions?: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const GetFeaturesDocument = gql`
    query getFeatures {
  features {
    features {
      id
      name
      description
      enabled
    }
  }
}
    `;

/**
 * __useGetFeaturesQuery__
 *
 * To run a query within a React component, call `useGetFeaturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeaturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeaturesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeaturesQuery(baseOptions?: Apollo.QueryHookOptions<GetFeaturesQuery, GetFeaturesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeaturesQuery, GetFeaturesQueryVariables>(GetFeaturesDocument, options);
      }
export function useGetFeaturesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeaturesQuery, GetFeaturesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeaturesQuery, GetFeaturesQueryVariables>(GetFeaturesDocument, options);
        }
export type GetFeaturesQueryHookResult = ReturnType<typeof useGetFeaturesQuery>;
export type GetFeaturesLazyQueryHookResult = ReturnType<typeof useGetFeaturesLazyQuery>;
export type GetFeaturesQueryResult = Apollo.QueryResult<GetFeaturesQuery, GetFeaturesQueryVariables>;
export const GetMatchingEngineCreditCardsDocument = gql`
    query GetMatchingEngineCreditCards {
  matchingEngineCards {
    name
    image
    link
  }
}
    `;

/**
 * __useGetMatchingEngineCreditCardsQuery__
 *
 * To run a query within a React component, call `useGetMatchingEngineCreditCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchingEngineCreditCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchingEngineCreditCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMatchingEngineCreditCardsQuery(baseOptions?: Apollo.QueryHookOptions<GetMatchingEngineCreditCardsQuery, GetMatchingEngineCreditCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchingEngineCreditCardsQuery, GetMatchingEngineCreditCardsQueryVariables>(GetMatchingEngineCreditCardsDocument, options);
      }
export function useGetMatchingEngineCreditCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchingEngineCreditCardsQuery, GetMatchingEngineCreditCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchingEngineCreditCardsQuery, GetMatchingEngineCreditCardsQueryVariables>(GetMatchingEngineCreditCardsDocument, options);
        }
export type GetMatchingEngineCreditCardsQueryHookResult = ReturnType<typeof useGetMatchingEngineCreditCardsQuery>;
export type GetMatchingEngineCreditCardsLazyQueryHookResult = ReturnType<typeof useGetMatchingEngineCreditCardsLazyQuery>;
export type GetMatchingEngineCreditCardsQueryResult = Apollo.QueryResult<GetMatchingEngineCreditCardsQuery, GetMatchingEngineCreditCardsQueryVariables>;
export const GetMatchingEngineLendersDocument = gql`
    query GetMatchingEngineLenders {
  matchingEngineLenders {
    name
    image
    link
  }
}
    `;

/**
 * __useGetMatchingEngineLendersQuery__
 *
 * To run a query within a React component, call `useGetMatchingEngineLendersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchingEngineLendersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchingEngineLendersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMatchingEngineLendersQuery(baseOptions?: Apollo.QueryHookOptions<GetMatchingEngineLendersQuery, GetMatchingEngineLendersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchingEngineLendersQuery, GetMatchingEngineLendersQueryVariables>(GetMatchingEngineLendersDocument, options);
      }
export function useGetMatchingEngineLendersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchingEngineLendersQuery, GetMatchingEngineLendersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchingEngineLendersQuery, GetMatchingEngineLendersQueryVariables>(GetMatchingEngineLendersDocument, options);
        }
export type GetMatchingEngineLendersQueryHookResult = ReturnType<typeof useGetMatchingEngineLendersQuery>;
export type GetMatchingEngineLendersLazyQueryHookResult = ReturnType<typeof useGetMatchingEngineLendersLazyQuery>;
export type GetMatchingEngineLendersQueryResult = Apollo.QueryResult<GetMatchingEngineLendersQuery, GetMatchingEngineLendersQueryVariables>;
export const GetMissingStripeRequirementsDocument = gql`
    query GetMissingStripeRequirements {
  me {
    merchantProfileDetails {
      countryCode
    }
  }
  missingStripeRequirements {
    persons {
      id
      name
      relationships
      missingFields {
        fieldName
        properties
      }
    }
    business {
      id
      name
      type
      missingFields {
        fieldName
        properties
      }
    }
  }
}
    `;

/**
 * __useGetMissingStripeRequirementsQuery__
 *
 * To run a query within a React component, call `useGetMissingStripeRequirementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMissingStripeRequirementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMissingStripeRequirementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMissingStripeRequirementsQuery(baseOptions?: Apollo.QueryHookOptions<GetMissingStripeRequirementsQuery, GetMissingStripeRequirementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMissingStripeRequirementsQuery, GetMissingStripeRequirementsQueryVariables>(GetMissingStripeRequirementsDocument, options);
      }
export function useGetMissingStripeRequirementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMissingStripeRequirementsQuery, GetMissingStripeRequirementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMissingStripeRequirementsQuery, GetMissingStripeRequirementsQueryVariables>(GetMissingStripeRequirementsDocument, options);
        }
export type GetMissingStripeRequirementsQueryHookResult = ReturnType<typeof useGetMissingStripeRequirementsQuery>;
export type GetMissingStripeRequirementsLazyQueryHookResult = ReturnType<typeof useGetMissingStripeRequirementsLazyQuery>;
export type GetMissingStripeRequirementsQueryResult = Apollo.QueryResult<GetMissingStripeRequirementsQuery, GetMissingStripeRequirementsQueryVariables>;
export const GetMyAssetAddressDocument = gql`
    query GetMyAssetAddress($asset: String) {
  myAssetAddress(asset: $asset) {
    code
    image
  }
}
    `;

/**
 * __useGetMyAssetAddressQuery__
 *
 * To run a query within a React component, call `useGetMyAssetAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAssetAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAssetAddressQuery({
 *   variables: {
 *      asset: // value for 'asset'
 *   },
 * });
 */
export function useGetMyAssetAddressQuery(baseOptions?: Apollo.QueryHookOptions<GetMyAssetAddressQuery, GetMyAssetAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyAssetAddressQuery, GetMyAssetAddressQueryVariables>(GetMyAssetAddressDocument, options);
      }
export function useGetMyAssetAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyAssetAddressQuery, GetMyAssetAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyAssetAddressQuery, GetMyAssetAddressQueryVariables>(GetMyAssetAddressDocument, options);
        }
export type GetMyAssetAddressQueryHookResult = ReturnType<typeof useGetMyAssetAddressQuery>;
export type GetMyAssetAddressLazyQueryHookResult = ReturnType<typeof useGetMyAssetAddressLazyQuery>;
export type GetMyAssetAddressQueryResult = Apollo.QueryResult<GetMyAssetAddressQuery, GetMyAssetAddressQueryVariables>;
export const GetMyAssetInterestRatesDocument = gql`
    query getMyAssetInterestRates {
  myAssetInterestRates {
    code
    name
    logoImage
    interestRate
  }
}
    `;

/**
 * __useGetMyAssetInterestRatesQuery__
 *
 * To run a query within a React component, call `useGetMyAssetInterestRatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAssetInterestRatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAssetInterestRatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyAssetInterestRatesQuery(baseOptions?: Apollo.QueryHookOptions<GetMyAssetInterestRatesQuery, GetMyAssetInterestRatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyAssetInterestRatesQuery, GetMyAssetInterestRatesQueryVariables>(GetMyAssetInterestRatesDocument, options);
      }
export function useGetMyAssetInterestRatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyAssetInterestRatesQuery, GetMyAssetInterestRatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyAssetInterestRatesQuery, GetMyAssetInterestRatesQueryVariables>(GetMyAssetInterestRatesDocument, options);
        }
export type GetMyAssetInterestRatesQueryHookResult = ReturnType<typeof useGetMyAssetInterestRatesQuery>;
export type GetMyAssetInterestRatesLazyQueryHookResult = ReturnType<typeof useGetMyAssetInterestRatesLazyQuery>;
export type GetMyAssetInterestRatesQueryResult = Apollo.QueryResult<GetMyAssetInterestRatesQuery, GetMyAssetInterestRatesQueryVariables>;
export const MyAssetsDocument = gql`
    query MyAssets($currency: String!, $type: String) {
  myAssets(currency: $currency, type: $type) {
    name
    code
    logoImage
    amount
    interestGaining
    exchangeRate
    fiatAmount {
      value
      display
      major
    }
  }
}
    `;

/**
 * __useMyAssetsQuery__
 *
 * To run a query within a React component, call `useMyAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAssetsQuery({
 *   variables: {
 *      currency: // value for 'currency'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useMyAssetsQuery(baseOptions: Apollo.QueryHookOptions<MyAssetsQuery, MyAssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyAssetsQuery, MyAssetsQueryVariables>(MyAssetsDocument, options);
      }
export function useMyAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyAssetsQuery, MyAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyAssetsQuery, MyAssetsQueryVariables>(MyAssetsDocument, options);
        }
export type MyAssetsQueryHookResult = ReturnType<typeof useMyAssetsQuery>;
export type MyAssetsLazyQueryHookResult = ReturnType<typeof useMyAssetsLazyQuery>;
export type MyAssetsQueryResult = Apollo.QueryResult<MyAssetsQuery, MyAssetsQueryVariables>;
export const GetMyAssetsAndMetricsDocument = gql`
    query GetMyAssetsAndMetrics($assetName: String!, $currency: String!) {
  myAssets(currency: $currency) {
    code
    amount
    fiatAmount {
      value
      major
      display
    }
  }
  getAssetMetrics(assetName: $assetName) {
    name
    code
    price
    currency
    logoImage
  }
}
    `;

/**
 * __useGetMyAssetsAndMetricsQuery__
 *
 * To run a query within a React component, call `useGetMyAssetsAndMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAssetsAndMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAssetsAndMetricsQuery({
 *   variables: {
 *      assetName: // value for 'assetName'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useGetMyAssetsAndMetricsQuery(baseOptions: Apollo.QueryHookOptions<GetMyAssetsAndMetricsQuery, GetMyAssetsAndMetricsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyAssetsAndMetricsQuery, GetMyAssetsAndMetricsQueryVariables>(GetMyAssetsAndMetricsDocument, options);
      }
export function useGetMyAssetsAndMetricsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyAssetsAndMetricsQuery, GetMyAssetsAndMetricsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyAssetsAndMetricsQuery, GetMyAssetsAndMetricsQueryVariables>(GetMyAssetsAndMetricsDocument, options);
        }
export type GetMyAssetsAndMetricsQueryHookResult = ReturnType<typeof useGetMyAssetsAndMetricsQuery>;
export type GetMyAssetsAndMetricsLazyQueryHookResult = ReturnType<typeof useGetMyAssetsAndMetricsLazyQuery>;
export type GetMyAssetsAndMetricsQueryResult = Apollo.QueryResult<GetMyAssetsAndMetricsQuery, GetMyAssetsAndMetricsQueryVariables>;
export const GetMyAssetsInterestSummaryDocument = gql`
    query getMyAssetsInterestSummary {
  myAssetsInterestSummary {
    totalInterestGained
    totalInterestGainedFiat {
      major
    }
    assets {
      name
      code
      logoImage
      interestGained
      interestGainedFiat {
        major
      }
    }
  }
}
    `;

/**
 * __useGetMyAssetsInterestSummaryQuery__
 *
 * To run a query within a React component, call `useGetMyAssetsInterestSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAssetsInterestSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAssetsInterestSummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyAssetsInterestSummaryQuery(baseOptions?: Apollo.QueryHookOptions<GetMyAssetsInterestSummaryQuery, GetMyAssetsInterestSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyAssetsInterestSummaryQuery, GetMyAssetsInterestSummaryQueryVariables>(GetMyAssetsInterestSummaryDocument, options);
      }
export function useGetMyAssetsInterestSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyAssetsInterestSummaryQuery, GetMyAssetsInterestSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyAssetsInterestSummaryQuery, GetMyAssetsInterestSummaryQueryVariables>(GetMyAssetsInterestSummaryDocument, options);
        }
export type GetMyAssetsInterestSummaryQueryHookResult = ReturnType<typeof useGetMyAssetsInterestSummaryQuery>;
export type GetMyAssetsInterestSummaryLazyQueryHookResult = ReturnType<typeof useGetMyAssetsInterestSummaryLazyQuery>;
export type GetMyAssetsInterestSummaryQueryResult = Apollo.QueryResult<GetMyAssetsInterestSummaryQuery, GetMyAssetsInterestSummaryQueryVariables>;
export const GetMyMerchantBusinessDetailsDocument = gql`
    query GetMyMerchantBusinessDetails {
  myMerchantProfile {
    acceptsPayments
    id
    businessDetails {
      type
      hasBanking
      hasOnboarded
    }
  }
}
    `;

/**
 * __useGetMyMerchantBusinessDetailsQuery__
 *
 * To run a query within a React component, call `useGetMyMerchantBusinessDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyMerchantBusinessDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyMerchantBusinessDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyMerchantBusinessDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyMerchantBusinessDetailsQuery, GetMyMerchantBusinessDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyMerchantBusinessDetailsQuery, GetMyMerchantBusinessDetailsQueryVariables>(GetMyMerchantBusinessDetailsDocument, options);
      }
export function useGetMyMerchantBusinessDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyMerchantBusinessDetailsQuery, GetMyMerchantBusinessDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyMerchantBusinessDetailsQuery, GetMyMerchantBusinessDetailsQueryVariables>(GetMyMerchantBusinessDetailsDocument, options);
        }
export type GetMyMerchantBusinessDetailsQueryHookResult = ReturnType<typeof useGetMyMerchantBusinessDetailsQuery>;
export type GetMyMerchantBusinessDetailsLazyQueryHookResult = ReturnType<typeof useGetMyMerchantBusinessDetailsLazyQuery>;
export type GetMyMerchantBusinessDetailsQueryResult = Apollo.QueryResult<GetMyMerchantBusinessDetailsQuery, GetMyMerchantBusinessDetailsQueryVariables>;
export const GetMyPaymentMethodsDocument = gql`
    query GetMyPaymentMethods($paymentMethodCategory: PaymentMethodCategory) {
  paymentMethods(type: $paymentMethodCategory) {
    id
    name
    lastFour
    expirationDate
    status
    type
    cardBrand {
      display
      image
    }
  }
}
    `;

/**
 * __useGetMyPaymentMethodsQuery__
 *
 * To run a query within a React component, call `useGetMyPaymentMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyPaymentMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyPaymentMethodsQuery({
 *   variables: {
 *      paymentMethodCategory: // value for 'paymentMethodCategory'
 *   },
 * });
 */
export function useGetMyPaymentMethodsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyPaymentMethodsQuery, GetMyPaymentMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyPaymentMethodsQuery, GetMyPaymentMethodsQueryVariables>(GetMyPaymentMethodsDocument, options);
      }
export function useGetMyPaymentMethodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyPaymentMethodsQuery, GetMyPaymentMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyPaymentMethodsQuery, GetMyPaymentMethodsQueryVariables>(GetMyPaymentMethodsDocument, options);
        }
export type GetMyPaymentMethodsQueryHookResult = ReturnType<typeof useGetMyPaymentMethodsQuery>;
export type GetMyPaymentMethodsLazyQueryHookResult = ReturnType<typeof useGetMyPaymentMethodsLazyQuery>;
export type GetMyPaymentMethodsQueryResult = Apollo.QueryResult<GetMyPaymentMethodsQuery, GetMyPaymentMethodsQueryVariables>;
export const GetPayoutSummaryDocument = gql`
    query getPayoutSummary {
  getPayoutSummary {
    currency
    currentBalance
    pendingBalance
    payoutHistory {
      date
      status
      amount {
        value
        display
        major
      }
    }
    available {
      value
      display
      major
    }
    pending {
      value
      display
      major
    }
  }
}
    `;

/**
 * __useGetPayoutSummaryQuery__
 *
 * To run a query within a React component, call `useGetPayoutSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPayoutSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPayoutSummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPayoutSummaryQuery(baseOptions?: Apollo.QueryHookOptions<GetPayoutSummaryQuery, GetPayoutSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPayoutSummaryQuery, GetPayoutSummaryQueryVariables>(GetPayoutSummaryDocument, options);
      }
export function useGetPayoutSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPayoutSummaryQuery, GetPayoutSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPayoutSummaryQuery, GetPayoutSummaryQueryVariables>(GetPayoutSummaryDocument, options);
        }
export type GetPayoutSummaryQueryHookResult = ReturnType<typeof useGetPayoutSummaryQuery>;
export type GetPayoutSummaryLazyQueryHookResult = ReturnType<typeof useGetPayoutSummaryLazyQuery>;
export type GetPayoutSummaryQueryResult = Apollo.QueryResult<GetPayoutSummaryQuery, GetPayoutSummaryQueryVariables>;
export const GetQuoteAndAssetDocument = gql`
    query GetQuoteAndAsset($quoteId: String, $assetCode: String) {
  asset: assetMetrics(assetName: $assetCode) {
    price
    logoImage
  }
  quote: getQuote(quoteId: $quoteId) {
    sourceCurrency
    sourceCurrencyCode
    sourceAmount
    destinationCurrency
    destinationCurrencyCode
    destinationAmount
    sourceFee
    fiatCurrencyCode
  }
}
    `;

/**
 * __useGetQuoteAndAssetQuery__
 *
 * To run a query within a React component, call `useGetQuoteAndAssetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuoteAndAssetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuoteAndAssetQuery({
 *   variables: {
 *      quoteId: // value for 'quoteId'
 *      assetCode: // value for 'assetCode'
 *   },
 * });
 */
export function useGetQuoteAndAssetQuery(baseOptions?: Apollo.QueryHookOptions<GetQuoteAndAssetQuery, GetQuoteAndAssetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuoteAndAssetQuery, GetQuoteAndAssetQueryVariables>(GetQuoteAndAssetDocument, options);
      }
export function useGetQuoteAndAssetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuoteAndAssetQuery, GetQuoteAndAssetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuoteAndAssetQuery, GetQuoteAndAssetQueryVariables>(GetQuoteAndAssetDocument, options);
        }
export type GetQuoteAndAssetQueryHookResult = ReturnType<typeof useGetQuoteAndAssetQuery>;
export type GetQuoteAndAssetLazyQueryHookResult = ReturnType<typeof useGetQuoteAndAssetLazyQuery>;
export type GetQuoteAndAssetQueryResult = Apollo.QueryResult<GetQuoteAndAssetQuery, GetQuoteAndAssetQueryVariables>;
export const GetQuoteByIdDocument = gql`
    query GetQuoteById($quoteId: String, $assetCode: String) {
  getQuote(quoteId: $quoteId, assetName: $assetCode) {
    paymentName
    sourceCurrency
    sourceCurrencyCode
    sourceAmount
    destinationCurrency
    destinationCurrencyCode
    destinationAmount
    sourceFee
    notes
    fiatFees
    fiatAmount
    fiatCurrencyCode
    destination
    isInternal
  }
}
    `;

/**
 * __useGetQuoteByIdQuery__
 *
 * To run a query within a React component, call `useGetQuoteByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuoteByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuoteByIdQuery({
 *   variables: {
 *      quoteId: // value for 'quoteId'
 *      assetCode: // value for 'assetCode'
 *   },
 * });
 */
export function useGetQuoteByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetQuoteByIdQuery, GetQuoteByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuoteByIdQuery, GetQuoteByIdQueryVariables>(GetQuoteByIdDocument, options);
      }
export function useGetQuoteByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuoteByIdQuery, GetQuoteByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuoteByIdQuery, GetQuoteByIdQueryVariables>(GetQuoteByIdDocument, options);
        }
export type GetQuoteByIdQueryHookResult = ReturnType<typeof useGetQuoteByIdQuery>;
export type GetQuoteByIdLazyQueryHookResult = ReturnType<typeof useGetQuoteByIdLazyQuery>;
export type GetQuoteByIdQueryResult = Apollo.QueryResult<GetQuoteByIdQuery, GetQuoteByIdQueryVariables>;
export const GetRecentlyTransactedWithDocument = gql`
    query GetRecentlyTransactedWith {
  me {
    recentlyTransactedWith {
      id
      image
      userName
      displayName
    }
  }
}
    `;

/**
 * __useGetRecentlyTransactedWithQuery__
 *
 * To run a query within a React component, call `useGetRecentlyTransactedWithQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentlyTransactedWithQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentlyTransactedWithQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecentlyTransactedWithQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentlyTransactedWithQuery, GetRecentlyTransactedWithQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentlyTransactedWithQuery, GetRecentlyTransactedWithQueryVariables>(GetRecentlyTransactedWithDocument, options);
      }
export function useGetRecentlyTransactedWithLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentlyTransactedWithQuery, GetRecentlyTransactedWithQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentlyTransactedWithQuery, GetRecentlyTransactedWithQueryVariables>(GetRecentlyTransactedWithDocument, options);
        }
export type GetRecentlyTransactedWithQueryHookResult = ReturnType<typeof useGetRecentlyTransactedWithQuery>;
export type GetRecentlyTransactedWithLazyQueryHookResult = ReturnType<typeof useGetRecentlyTransactedWithLazyQuery>;
export type GetRecentlyTransactedWithQueryResult = Apollo.QueryResult<GetRecentlyTransactedWithQuery, GetRecentlyTransactedWithQueryVariables>;
export const GetReviewsByAccountIdDocument = gql`
    query getReviewsByAccountId($merchantId: String!, $page: Int, $limit: Int) {
  reviews(merchantId: $merchantId, page: $page, limit: $limit) {
    nodes {
      transaction {
        sender {
          displayName
          userName
          image
        }
      }
      id
      date
      detail
      averageRating
      rating
    }
    pageInfo {
      currentPage
      totalCount
      perPage
    }
  }
}
    `;

/**
 * __useGetReviewsByAccountIdQuery__
 *
 * To run a query within a React component, call `useGetReviewsByAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsByAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsByAccountIdQuery({
 *   variables: {
 *      merchantId: // value for 'merchantId'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetReviewsByAccountIdQuery(baseOptions: Apollo.QueryHookOptions<GetReviewsByAccountIdQuery, GetReviewsByAccountIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsByAccountIdQuery, GetReviewsByAccountIdQueryVariables>(GetReviewsByAccountIdDocument, options);
      }
export function useGetReviewsByAccountIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsByAccountIdQuery, GetReviewsByAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsByAccountIdQuery, GetReviewsByAccountIdQueryVariables>(GetReviewsByAccountIdDocument, options);
        }
export type GetReviewsByAccountIdQueryHookResult = ReturnType<typeof useGetReviewsByAccountIdQuery>;
export type GetReviewsByAccountIdLazyQueryHookResult = ReturnType<typeof useGetReviewsByAccountIdLazyQuery>;
export type GetReviewsByAccountIdQueryResult = Apollo.QueryResult<GetReviewsByAccountIdQuery, GetReviewsByAccountIdQueryVariables>;
export const GetVenueByIdDocument = gql`
    query GetVenueById($id: String!) {
  getVenueById(merchant: $id) {
    merchant {
      id
      displayName
      address {
        street
        streetAdditional
        city
        region
        postal
      }
    }
    platformId
    venueEvents {
      events {
        eventInfo {
          id
          title
          imageUrl
          dateTime
        }
      }
    }
  }
}
    `;

/**
 * __useGetVenueByIdQuery__
 *
 * To run a query within a React component, call `useGetVenueByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVenueByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVenueByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVenueByIdQuery(baseOptions: Apollo.QueryHookOptions<GetVenueByIdQuery, GetVenueByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVenueByIdQuery, GetVenueByIdQueryVariables>(GetVenueByIdDocument, options);
      }
export function useGetVenueByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVenueByIdQuery, GetVenueByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVenueByIdQuery, GetVenueByIdQueryVariables>(GetVenueByIdDocument, options);
        }
export type GetVenueByIdQueryHookResult = ReturnType<typeof useGetVenueByIdQuery>;
export type GetVenueByIdLazyQueryHookResult = ReturnType<typeof useGetVenueByIdLazyQuery>;
export type GetVenueByIdQueryResult = Apollo.QueryResult<GetVenueByIdQuery, GetVenueByIdQueryVariables>;
export const GetWalletBalanceHistoryDocument = gql`
    query GetWalletBalanceHistory($period: MarketPeriodInput) {
  getWalletBalanceHistory(period: $period) {
    totalFiatBalance
    start
    end
    minPrice
    maxPrice
    firstValidPointIndex
    history {
      price
      time
    }
  }
}
    `;

/**
 * __useGetWalletBalanceHistoryQuery__
 *
 * To run a query within a React component, call `useGetWalletBalanceHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletBalanceHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWalletBalanceHistoryQuery({
 *   variables: {
 *      period: // value for 'period'
 *   },
 * });
 */
export function useGetWalletBalanceHistoryQuery(baseOptions?: Apollo.QueryHookOptions<GetWalletBalanceHistoryQuery, GetWalletBalanceHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWalletBalanceHistoryQuery, GetWalletBalanceHistoryQueryVariables>(GetWalletBalanceHistoryDocument, options);
      }
export function useGetWalletBalanceHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWalletBalanceHistoryQuery, GetWalletBalanceHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWalletBalanceHistoryQuery, GetWalletBalanceHistoryQueryVariables>(GetWalletBalanceHistoryDocument, options);
        }
export type GetWalletBalanceHistoryQueryHookResult = ReturnType<typeof useGetWalletBalanceHistoryQuery>;
export type GetWalletBalanceHistoryLazyQueryHookResult = ReturnType<typeof useGetWalletBalanceHistoryLazyQuery>;
export type GetWalletBalanceHistoryQueryResult = Apollo.QueryResult<GetWalletBalanceHistoryQuery, GetWalletBalanceHistoryQueryVariables>;
export const MyAccountsDocument = gql`
    query MyAccounts {
  accounts {
    image
    displayName
    userName
    id
  }
}
    `;

/**
 * __useMyAccountsQuery__
 *
 * To run a query within a React component, call `useMyAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyAccountsQuery(baseOptions?: Apollo.QueryHookOptions<MyAccountsQuery, MyAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyAccountsQuery, MyAccountsQueryVariables>(MyAccountsDocument, options);
      }
export function useMyAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyAccountsQuery, MyAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyAccountsQuery, MyAccountsQueryVariables>(MyAccountsDocument, options);
        }
export type MyAccountsQueryHookResult = ReturnType<typeof useMyAccountsQuery>;
export type MyAccountsLazyQueryHookResult = ReturnType<typeof useMyAccountsLazyQuery>;
export type MyAccountsQueryResult = Apollo.QueryResult<MyAccountsQuery, MyAccountsQueryVariables>;
export const MyUserProfileDocument = gql`
    query myUserProfile {
  myUserProfile {
    firstName
    lastName
    fullName
    createdOn
  }
}
    `;

/**
 * __useMyUserProfileQuery__
 *
 * To run a query within a React component, call `useMyUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<MyUserProfileQuery, MyUserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyUserProfileQuery, MyUserProfileQueryVariables>(MyUserProfileDocument, options);
      }
export function useMyUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyUserProfileQuery, MyUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyUserProfileQuery, MyUserProfileQueryVariables>(MyUserProfileDocument, options);
        }
export type MyUserProfileQueryHookResult = ReturnType<typeof useMyUserProfileQuery>;
export type MyUserProfileLazyQueryHookResult = ReturnType<typeof useMyUserProfileLazyQuery>;
export type MyUserProfileQueryResult = Apollo.QueryResult<MyUserProfileQuery, MyUserProfileQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    userName
    hasMultipleAccounts
    hasMerchantAccount
    isMerchant
    displayName
    image
    id
    city
    isPrivate
    phone
    country {
      name
      alpha2
      currencyCode
    }
    qr {
      image
      code
    }
    merchantProfileDetails {
      id
      merchantType
      displayName
      address {
        street
        streetAdditional
        city
        region
        postal
      }
      status
      currency
      countryCode
      acceptsPayments
      payoutsEnabled
      capabilities
      geom
      country {
        name
        alpha2
      }
    }
    recentlyTransactedWith {
      id
      userName
      displayName
      image
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SearchAccountsDocument = gql`
    query searchAccounts($search: String!, $isMerchant: Boolean = true) {
  searchAccounts(searchString: $search, isMerchant: $isMerchant) {
    id
    userName
    displayName
    image
    isMerchant
  }
}
    `;

/**
 * __useSearchAccountsQuery__
 *
 * To run a query within a React component, call `useSearchAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAccountsQuery({
 *   variables: {
 *      search: // value for 'search'
 *      isMerchant: // value for 'isMerchant'
 *   },
 * });
 */
export function useSearchAccountsQuery(baseOptions: Apollo.QueryHookOptions<SearchAccountsQuery, SearchAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchAccountsQuery, SearchAccountsQueryVariables>(SearchAccountsDocument, options);
      }
export function useSearchAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchAccountsQuery, SearchAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchAccountsQuery, SearchAccountsQueryVariables>(SearchAccountsDocument, options);
        }
export type SearchAccountsQueryHookResult = ReturnType<typeof useSearchAccountsQuery>;
export type SearchAccountsLazyQueryHookResult = ReturnType<typeof useSearchAccountsLazyQuery>;
export type SearchAccountsQueryResult = Apollo.QueryResult<SearchAccountsQuery, SearchAccountsQueryVariables>;
export const IsUsernameAvailableDocument = gql`
    query isUsernameAvailable($keyword: String!) {
  isUsernameAvailable(keyword: $keyword)
}
    `;

/**
 * __useIsUsernameAvailableQuery__
 *
 * To run a query within a React component, call `useIsUsernameAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUsernameAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUsernameAvailableQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useIsUsernameAvailableQuery(baseOptions: Apollo.QueryHookOptions<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>(IsUsernameAvailableDocument, options);
      }
export function useIsUsernameAvailableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>(IsUsernameAvailableDocument, options);
        }
export type IsUsernameAvailableQueryHookResult = ReturnType<typeof useIsUsernameAvailableQuery>;
export type IsUsernameAvailableLazyQueryHookResult = ReturnType<typeof useIsUsernameAvailableLazyQuery>;
export type IsUsernameAvailableQueryResult = Apollo.QueryResult<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>;
export const GetBanksDocument = gql`
    query getBanks {
  getBanks {
    id
    lastFour
    nickname
    country
    accountHolder
    account {
      userName
      id
    }
  }
}
    `;

/**
 * __useGetBanksQuery__
 *
 * To run a query within a React component, call `useGetBanksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBanksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBanksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBanksQuery(baseOptions?: Apollo.QueryHookOptions<GetBanksQuery, GetBanksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBanksQuery, GetBanksQueryVariables>(GetBanksDocument, options);
      }
export function useGetBanksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBanksQuery, GetBanksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBanksQuery, GetBanksQueryVariables>(GetBanksDocument, options);
        }
export type GetBanksQueryHookResult = ReturnType<typeof useGetBanksQuery>;
export type GetBanksLazyQueryHookResult = ReturnType<typeof useGetBanksLazyQuery>;
export type GetBanksQueryResult = Apollo.QueryResult<GetBanksQuery, GetBanksQueryVariables>;
export const GetMarketListDocument = gql`
    query getMarketList($period: MarketPeriodInput, $limit: Int) {
  getMarketList(period: $period, limit: $limit) {
    assets {
      currency
      name
      code
      logoImage
      price
      percentChangeOverPeriod
    }
  }
}
    `;

/**
 * __useGetMarketListQuery__
 *
 * To run a query within a React component, call `useGetMarketListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarketListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarketListQuery({
 *   variables: {
 *      period: // value for 'period'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMarketListQuery(baseOptions?: Apollo.QueryHookOptions<GetMarketListQuery, GetMarketListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMarketListQuery, GetMarketListQueryVariables>(GetMarketListDocument, options);
      }
export function useGetMarketListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMarketListQuery, GetMarketListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMarketListQuery, GetMarketListQueryVariables>(GetMarketListDocument, options);
        }
export type GetMarketListQueryHookResult = ReturnType<typeof useGetMarketListQuery>;
export type GetMarketListLazyQueryHookResult = ReturnType<typeof useGetMarketListLazyQuery>;
export type GetMarketListQueryResult = Apollo.QueryResult<GetMarketListQuery, GetMarketListQueryVariables>;
export const GetMarketTopMoversListDocument = gql`
    query getMarketTopMoversList {
  getMarketList(sortBy: TOP_MOVERS, limit: 4) {
    assets {
      currency
      name
      code
      logoImage
      price
      percentChangeOverPeriod
    }
  }
}
    `;

/**
 * __useGetMarketTopMoversListQuery__
 *
 * To run a query within a React component, call `useGetMarketTopMoversListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarketTopMoversListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarketTopMoversListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMarketTopMoversListQuery(baseOptions?: Apollo.QueryHookOptions<GetMarketTopMoversListQuery, GetMarketTopMoversListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMarketTopMoversListQuery, GetMarketTopMoversListQueryVariables>(GetMarketTopMoversListDocument, options);
      }
export function useGetMarketTopMoversListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMarketTopMoversListQuery, GetMarketTopMoversListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMarketTopMoversListQuery, GetMarketTopMoversListQueryVariables>(GetMarketTopMoversListDocument, options);
        }
export type GetMarketTopMoversListQueryHookResult = ReturnType<typeof useGetMarketTopMoversListQuery>;
export type GetMarketTopMoversListLazyQueryHookResult = ReturnType<typeof useGetMarketTopMoversListLazyQuery>;
export type GetMarketTopMoversListQueryResult = Apollo.QueryResult<GetMarketTopMoversListQuery, GetMarketTopMoversListQueryVariables>;
export const SearchForUserContactsDocument = gql`
    query searchForUserContacts($contacts: [ContactInput]) {
  searchForUserContacts(contacts: $contacts) {
    id
    userName
    displayName
    image
    isMerchant
  }
}
    `;

/**
 * __useSearchForUserContactsQuery__
 *
 * To run a query within a React component, call `useSearchForUserContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchForUserContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchForUserContactsQuery({
 *   variables: {
 *      contacts: // value for 'contacts'
 *   },
 * });
 */
export function useSearchForUserContactsQuery(baseOptions?: Apollo.QueryHookOptions<SearchForUserContactsQuery, SearchForUserContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchForUserContactsQuery, SearchForUserContactsQueryVariables>(SearchForUserContactsDocument, options);
      }
export function useSearchForUserContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchForUserContactsQuery, SearchForUserContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchForUserContactsQuery, SearchForUserContactsQueryVariables>(SearchForUserContactsDocument, options);
        }
export type SearchForUserContactsQueryHookResult = ReturnType<typeof useSearchForUserContactsQuery>;
export type SearchForUserContactsLazyQueryHookResult = ReturnType<typeof useSearchForUserContactsLazyQuery>;
export type SearchForUserContactsQueryResult = Apollo.QueryResult<SearchForUserContactsQuery, SearchForUserContactsQueryVariables>;
export const GetWalletDocument = gql`
    query getWallet($type: String) {
  wallet {
    id
    assets(type: $type) {
      name
      code
      amount
      logoImage
      fiatAmount {
        value
        display
        major
      }
      currency
      interestGaining
      exchangeRate
    }
  }
}
    `;

/**
 * __useGetWalletQuery__
 *
 * To run a query within a React component, call `useGetWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWalletQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetWalletQuery(baseOptions?: Apollo.QueryHookOptions<GetWalletQuery, GetWalletQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWalletQuery, GetWalletQueryVariables>(GetWalletDocument, options);
      }
export function useGetWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWalletQuery, GetWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWalletQuery, GetWalletQueryVariables>(GetWalletDocument, options);
        }
export type GetWalletQueryHookResult = ReturnType<typeof useGetWalletQuery>;
export type GetWalletLazyQueryHookResult = ReturnType<typeof useGetWalletLazyQuery>;
export type GetWalletQueryResult = Apollo.QueryResult<GetWalletQuery, GetWalletQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
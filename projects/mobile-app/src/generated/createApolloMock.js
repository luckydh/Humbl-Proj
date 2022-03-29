import { createApolloMock } from 'apollo-typed-documents';

const operations = {};

export default createApolloMock(operations);

operations.AddCreditCard = {};
operations.AddCreditCard.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ cardBrand = undefined, tokenizedCardNum = undefined, tokenizedCVC = undefined, nameOnCard = undefined, expirationDate = undefined, lastFour = undefined, street = undefined, streetAdditional = undefined, city = undefined, postal = undefined, region = undefined, country = undefined }) => ({ cardBrand, tokenizedCardNum, tokenizedCVC, nameOnCard, expirationDate, lastFour, street, streetAdditional, city, postal, region, country }))(values);
  values.__typename = __typename;
  return {
    cardBrand: (values.cardBrand === null || values.cardBrand === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'cardBrand', __typename, scalarValues: options.scalarValues }) : values.cardBrand,
    tokenizedCardNum: (values.tokenizedCardNum === null || values.tokenizedCardNum === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'tokenizedCardNum', __typename, scalarValues: options.scalarValues }) : values.tokenizedCardNum,
    tokenizedCVC: (values.tokenizedCVC === null || values.tokenizedCVC === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'tokenizedCVC', __typename, scalarValues: options.scalarValues }) : values.tokenizedCVC,
    nameOnCard: (values.nameOnCard === null || values.nameOnCard === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nameOnCard', __typename, scalarValues: options.scalarValues }) : values.nameOnCard,
    expirationDate: (values.expirationDate === null || values.expirationDate === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'expirationDate', __typename, scalarValues: options.scalarValues }) : values.expirationDate,
    lastFour: (values.lastFour === null || values.lastFour === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'lastFour', __typename, scalarValues: options.scalarValues }) : values.lastFour,
    street: (values.street === null || values.street === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'street', __typename, scalarValues: options.scalarValues }) : values.street,
    streetAdditional: (values.streetAdditional === null || values.streetAdditional === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'streetAdditional', __typename, scalarValues: options.scalarValues }) : values.streetAdditional,
    city: (values.city === null || values.city === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'city', __typename, scalarValues: options.scalarValues }) : values.city,
    postal: (values.postal === null || values.postal === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'postal', __typename, scalarValues: options.scalarValues }) : values.postal,
    region: (values.region === null || values.region === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'region', __typename, scalarValues: options.scalarValues }) : values.region,
    country: (values.country === null || values.country === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'country', __typename, scalarValues: options.scalarValues }) : values.country
  };
};
operations.AddCreditCard.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ createPaymentMethod = null }) => ({ createPaymentMethod }))(values);
  values.__typename = __typename;
  return {
    createPaymentMethod: ((values = {}, options = {}) => {
      const __typename = 'PaymentMethodType';
      values = (({ id = null, lastFour = null, cardBrand = null, status = null, type = null, expirationDate = null, name = null }) => ({ id, lastFour, cardBrand, status, type, expirationDate, name }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        lastFour: values.lastFour,
        cardBrand: !values.cardBrand ? values.cardBrand : ((values = {}, options = {}) => {
          const __typename = 'CardBrand';
          values = (({ id = null, display = null, image = null }) => ({ id, display, image }))(values);
          values.__typename = __typename;
          return {
            id: values.id,
            display: values.display,
            image: values.image,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.cardBrand, options),
        status: values.status,
        type: (values.type === null || values.type === undefined) ? "ACH" : values.type,
        expirationDate: values.expirationDate,
        name: values.name,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.createPaymentMethod || undefined, options)
  };
};

operations.UpdateAccountImage = {};
operations.UpdateAccountImage.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ image = undefined, dimensions = undefined }) => ({ image, dimensions }))(values);
  values.__typename = __typename;
  return {
    image: values.image,
    dimensions: !values.dimensions ? values.dimensions : (ImageDimensions)(values.dimensions, options)
  };
};
operations.UpdateAccountImage.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ updateAccountImage = null }) => ({ updateAccountImage }))(values);
  values.__typename = __typename;
  return {
    updateAccountImage: !values.updateAccountImage ? values.updateAccountImage : ((values = {}, options = {}) => {
      const __typename = 'AccountType';
      values = (({ image = null }) => ({ image }))(values);
      values.__typename = __typename;
      return {
        image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.updateAccountImage, options)
  };
};

operations.CompleteTicketOrderWithPayment = {};
operations.CompleteTicketOrderWithPayment.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ orderId = undefined, eventId = undefined, merchantId = undefined, payMethodId = undefined, postal = undefined, cvv = undefined }) => ({ orderId, eventId, merchantId, payMethodId, postal, cvv }))(values);
  values.__typename = __typename;
  return {
    orderId: values.orderId,
    eventId: values.eventId,
    merchantId: values.merchantId,
    payMethodId: values.payMethodId,
    postal: values.postal,
    cvv: values.cvv
  };
};
operations.CompleteTicketOrderWithPayment.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ completeTicketOrderWithPayment = null }) => ({ completeTicketOrderWithPayment }))(values);
  values.__typename = __typename;
  return {
    completeTicketOrderWithPayment: !values.completeTicketOrderWithPayment ? values.completeTicketOrderWithPayment : ((values = {}, options = {}) => {
      const __typename = 'OrderType';
      values = (({ successMessage = null }) => ({ successMessage }))(values);
      values.__typename = __typename;
      return {
        successMessage: values.successMessage,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.completeTicketOrderWithPayment, options)
  };
};

operations.createCompanyStripeAccount = {};
operations.createCompanyStripeAccount.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ legalName = undefined, taxId = undefined, email = undefined, address = undefined, phone = undefined, website = undefined, businessDescription = undefined, structure = undefined, persons = undefined }) => ({ legalName, taxId, email, address, phone, website, businessDescription, structure, persons }))(values);
  values.__typename = __typename;
  return {
    legalName: values.legalName,
    taxId: values.taxId,
    email: values.email,
    address: !values.address ? values.address : (AddressInput)(values.address, options),
    phone: values.phone,
    website: values.website,
    businessDescription: values.businessDescription,
    structure: values.structure,
    persons: !values.persons ? values.persons : values.persons.map(item => (StripePersonInput)(item, options))
  };
};
operations.createCompanyStripeAccount.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ createCompanyStripeAccount = null }) => ({ createCompanyStripeAccount }))(values);
  values.__typename = __typename;
  return {
    createCompanyStripeAccount: values.createCompanyStripeAccount
  };
};

operations.createCompleteTransaction = {};
operations.createCompleteTransaction.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ tip = undefined, amount = undefined, subtotal = undefined, currency = undefined, destinationAccountTag = undefined, methodUsed = undefined }) => ({ tip, amount, subtotal, currency, destinationAccountTag, methodUsed }))(values);
  values.__typename = __typename;
  return {
    tip: (values.tip === null || values.tip === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'tip', __typename, scalarValues: options.scalarValues }) : values.tip,
    amount: (values.amount === null || values.amount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'amount', __typename, scalarValues: options.scalarValues }) : values.amount,
    subtotal: (values.subtotal === null || values.subtotal === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'subtotal', __typename, scalarValues: options.scalarValues }) : values.subtotal,
    currency: (values.currency === null || values.currency === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'currency', __typename, scalarValues: options.scalarValues }) : values.currency,
    destinationAccountTag: (values.destinationAccountTag === null || values.destinationAccountTag === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'destinationAccountTag', __typename, scalarValues: options.scalarValues }) : values.destinationAccountTag,
    methodUsed: (values.methodUsed === null || values.methodUsed === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'methodUsed', __typename, scalarValues: options.scalarValues }) : values.methodUsed
  };
};
operations.createCompleteTransaction.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ createCompleteTransaction = null }) => ({ createCompleteTransaction }))(values);
  values.__typename = __typename;
  return {
    createCompleteTransaction: !values.createCompleteTransaction ? values.createCompleteTransaction : ((values = {}, options = {}) => {
      const __typename = 'PaymentIntentNeedsCompletionType';
      values = (({ transaction = null, intentSecret = null }) => ({ transaction, intentSecret }))(values);
      values.__typename = __typename;
      return {
        transaction: !values.transaction ? values.transaction : ((values = {}, options = {}) => {
          const __typename = 'TransactionType';
          values = (({ id = null, amount = null, transactionType = null }) => ({ id, amount, transactionType }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            amount: values.amount,
            transactionType: values.transactionType,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.transaction, options),
        intentSecret: values.intentSecret,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.createCompleteTransaction, options)
  };
};

operations.createIndividualStripeAccount = {};
operations.createIndividualStripeAccount.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ firstName = undefined, lastName = undefined, phone = undefined, dob = undefined, email = undefined, govId = undefined, businessDescription = undefined, address = undefined, website = undefined }) => ({ firstName, lastName, phone, dob, email, govId, businessDescription, address, website }))(values);
  values.__typename = __typename;
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    phone: values.phone,
    dob: !values.dob ? values.dob : (BirthdayInput)(values.dob, options),
    email: values.email,
    govId: values.govId,
    businessDescription: values.businessDescription,
    address: !values.address ? values.address : (AddressInput)(values.address, options),
    website: values.website
  };
};
operations.createIndividualStripeAccount.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ createIndividualStripeAccount = null }) => ({ createIndividualStripeAccount }))(values);
  values.__typename = __typename;
  return {
    createIndividualStripeAccount: values.createIndividualStripeAccount
  };
};

operations.CreateMerchant = {};
operations.CreateMerchant.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ displayName = undefined, merchantType = undefined, phoneNumber = undefined, userName = undefined, location = undefined, base64Image = undefined, currency = undefined }) => ({ displayName, merchantType, phoneNumber, userName, location, base64Image, currency }))(values);
  values.__typename = __typename;
  return {
    displayName: values.displayName,
    merchantType: values.merchantType,
    phoneNumber: values.phoneNumber,
    userName: values.userName,
    location: !values.location ? values.location : (AddressInput)(values.location, options),
    base64Image: values.base64Image,
    currency: values.currency
  };
};
operations.CreateMerchant.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ createMerchant = null }) => ({ createMerchant }))(values);
  values.__typename = __typename;
  return {
    createMerchant: !values.createMerchant ? values.createMerchant : ((values = {}, options = {}) => {
      const __typename = 'AccountType';
      values = (({ userName = null, hasMultipleAccounts = null, hasMerchantAccount = null, isMerchant = null, displayName = null, image = null, id = null, city = null, isPrivate = null, phone = null, country = null, qr = null, merchantProfileDetails = null }) => ({ userName, hasMultipleAccounts, hasMerchantAccount, isMerchant, displayName, image, id, city, isPrivate, phone, country, qr, merchantProfileDetails }))(values);
      values.__typename = __typename;
      return {
        userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
        hasMultipleAccounts: values.hasMultipleAccounts,
        hasMerchantAccount: values.hasMerchantAccount,
        isMerchant: values.isMerchant,
        displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
        image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        city: values.city,
        isPrivate: values.isPrivate,
        phone: values.phone,
        country: !values.country ? values.country : ((values = {}, options = {}) => {
          const __typename = 'CountryType';
          values = (({ name = null, alpha2 = null }) => ({ name, alpha2 }))(values);
          values.__typename = __typename;
          return {
            name: values.name,
            alpha2: values.alpha2,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.country, options),
        qr: !values.qr ? values.qr : ((values = {}, options = {}) => {
          const __typename = 'QRType';
          values = (({ image = null, code = null }) => ({ image, code }))(values);
          values.__typename = __typename;
          return {
            image: values.image,
            code: values.code,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.qr, options),
        merchantProfileDetails: !values.merchantProfileDetails ? values.merchantProfileDetails : ((values = {}, options = {}) => {
          const __typename = 'MerchantProfileType';
          values = (({ id = null, merchantType = null, displayName = null, address = null, currency = null, countryCode = null, acceptsPayments = null }) => ({ id, merchantType, displayName, address, currency, countryCode, acceptsPayments }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            merchantType: values.merchantType,
            displayName: values.displayName,
            address: !values.address ? values.address : ((values = {}, options = {}) => {
              const __typename = 'AddressType';
              values = (({ street = null, streetAdditional = null, city = null, region = null, postal = null }) => ({ street, streetAdditional, city, region, postal }))(values);
              values.__typename = __typename;
              return {
                street: values.street,
                streetAdditional: values.streetAdditional,
                city: values.city,
                region: values.region,
                postal: values.postal,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.address, options),
            currency: values.currency,
            countryCode: values.countryCode,
            acceptsPayments: values.acceptsPayments,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.merchantProfileDetails, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.createMerchant, options)
  };
};

operations.CreateMerchantTransaction = {};
operations.CreateMerchantTransaction.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ tip = undefined, amount = undefined, subtotal = undefined, currency = undefined, destinationAccountTag = undefined, methodUsed = undefined }) => ({ tip, amount, subtotal, currency, destinationAccountTag, methodUsed }))(values);
  values.__typename = __typename;
  return {
    tip: (values.tip === null || values.tip === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'tip', __typename, scalarValues: options.scalarValues }) : values.tip,
    amount: (values.amount === null || values.amount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'amount', __typename, scalarValues: options.scalarValues }) : values.amount,
    subtotal: (values.subtotal === null || values.subtotal === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'subtotal', __typename, scalarValues: options.scalarValues }) : values.subtotal,
    currency: (values.currency === null || values.currency === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'currency', __typename, scalarValues: options.scalarValues }) : values.currency,
    destinationAccountTag: (values.destinationAccountTag === null || values.destinationAccountTag === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'destinationAccountTag', __typename, scalarValues: options.scalarValues }) : values.destinationAccountTag,
    methodUsed: (values.methodUsed === null || values.methodUsed === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'methodUsed', __typename, scalarValues: options.scalarValues }) : values.methodUsed
  };
};
operations.CreateMerchantTransaction.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ createChargeCardTransaction = null }) => ({ createChargeCardTransaction }))(values);
  values.__typename = __typename;
  return {
    createChargeCardTransaction: !values.createChargeCardTransaction ? values.createChargeCardTransaction : ((values = {}, options = {}) => {
      const __typename = 'TransactionType';
      values = (({ id = null }) => ({ id }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.createChargeCardTransaction, options)
  };
};

operations.CreateNewUser = {};
operations.CreateNewUser.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ email = undefined, password = undefined, firstName = undefined, lastName = undefined, userName = undefined, city = undefined, country = undefined, phone = undefined }) => ({ email, password, firstName, lastName, userName, city, country, phone }))(values);
  values.__typename = __typename;
  return {
    email: values.email,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    userName: values.userName,
    city: values.city,
    country: values.country,
    phone: values.phone
  };
};
operations.CreateNewUser.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ createNewUser = null }) => ({ createNewUser }))(values);
  values.__typename = __typename;
  return {
    createNewUser: values.createNewUser
  };
};

operations.CreateRefundCardTransaction = {};
operations.CreateRefundCardTransaction.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ amount = undefined, currency = undefined, notes = undefined, transaction = undefined, destinationAccountTag = undefined, txDetailId = undefined }) => ({ amount, currency, notes, transaction, destinationAccountTag, txDetailId }))(values);
  values.__typename = __typename;
  return {
    amount: values.amount,
    currency: values.currency,
    notes: values.notes,
    transaction: values.transaction,
    destinationAccountTag: values.destinationAccountTag,
    txDetailId: values.txDetailId
  };
};
operations.CreateRefundCardTransaction.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ createRefundCardTransaction = null }) => ({ createRefundCardTransaction }))(values);
  values.__typename = __typename;
  return {
    createRefundCardTransaction: !values.createRefundCardTransaction ? values.createRefundCardTransaction : ((values = {}, options = {}) => {
      const __typename = 'TransactionType';
      values = (({ id = null, receiver = null, sender = null, dateOfTransaction = null, amount = null, total = null, currency = null, isRefunded = null }) => ({ id, receiver, sender, dateOfTransaction, amount, total, currency, isRefunded }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        receiver: !values.receiver ? values.receiver : ((values = {}, options = {}) => {
          const __typename = 'AccountType';
          values = (({ id = null, userName = null, displayName = null, image = null }) => ({ id, userName, displayName, image }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
            displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
            image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.receiver, options),
        sender: !values.sender ? values.sender : ((values = {}, options = {}) => {
          const __typename = 'AccountType';
          values = (({ id = null, userName = null, displayName = null, image = null }) => ({ id, userName, displayName, image }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
            displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
            image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.sender, options),
        dateOfTransaction: values.dateOfTransaction,
        amount: values.amount,
        total: !values.total ? values.total : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ major = null, value = null, display = null }) => ({ major, value, display }))(values);
          values.__typename = __typename;
          return {
            major: values.major,
            value: values.value,
            display: values.display,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.total, options),
        currency: values.currency,
        isRefunded: values.isRefunded,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.createRefundCardTransaction, options)
  };
};

operations.CreateReview = {};
operations.CreateReview.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ rating = undefined, details = undefined, merchantId = undefined, relatedTransaction = undefined }) => ({ rating, details, merchantId, relatedTransaction }))(values);
  values.__typename = __typename;
  return {
    rating: (values.rating === null || values.rating === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'rating', __typename, scalarValues: options.scalarValues }) : values.rating,
    details: (values.details === null || values.details === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'details', __typename, scalarValues: options.scalarValues }) : values.details,
    merchantId: (values.merchantId === null || values.merchantId === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'merchantId', __typename, scalarValues: options.scalarValues }) : values.merchantId,
    relatedTransaction: (values.relatedTransaction === null || values.relatedTransaction === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'relatedTransaction', __typename, scalarValues: options.scalarValues }) : values.relatedTransaction
  };
};
operations.CreateReview.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ createReview = null }) => ({ createReview }))(values);
  values.__typename = __typename;
  return {
    createReview: ((values = {}, options = {}) => {
      const __typename = 'ReviewType';
      values = (({ id = null }) => ({ id }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.createReview || undefined, options)
  };
};

operations.startTicketOrder = {};
operations.startTicketOrder.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ tickets = undefined, merchantId = undefined, platformEventId = undefined }) => ({ tickets, merchantId, platformEventId }))(values);
  values.__typename = __typename;
  return {
    tickets: !values.tickets ? values.tickets : values.tickets.map(item => (TicketsWithAmount)(item, options)),
    merchantId: values.merchantId,
    platformEventId: values.platformEventId
  };
};
operations.startTicketOrder.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ startTicketOrder = null }) => ({ startTicketOrder }))(values);
  values.__typename = __typename;
  return {
    startTicketOrder: !values.startTicketOrder ? values.startTicketOrder : ((values = {}, options = {}) => {
      const __typename = 'OrderType';
      values = (({ orderId = null }) => ({ orderId }))(values);
      values.__typename = __typename;
      return {
        orderId: (values.orderId === null || values.orderId === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'orderId', __typename, scalarValues: options.scalarValues }) : values.orderId,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.startTicketOrder, options)
  };
};

operations.ConfirmACHQuote = {};
operations.ConfirmACHQuote.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ quoteId = undefined }) => ({ quoteId }))(values);
  values.__typename = __typename;
  return {
    quoteId: values.quoteId
  };
};
operations.ConfirmACHQuote.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ confirmACHQuote = null }) => ({ confirmACHQuote }))(values);
  values.__typename = __typename;
  return {
    confirmACHQuote: !values.confirmACHQuote ? values.confirmACHQuote : ((values = {}, options = {}) => {
      const __typename = 'ConfirmedQuoteType';
      values = (({ sourceAmount = null, sourceCurrencyCode = null, destinationAmount = null, email = null, transactionId = null, fiatAmount = null, fiatCurrencyCode = null }) => ({ sourceAmount, sourceCurrencyCode, destinationAmount, email, transactionId, fiatAmount, fiatCurrencyCode }))(values);
      values.__typename = __typename;
      return {
        sourceAmount: values.sourceAmount,
        sourceCurrencyCode: values.sourceCurrencyCode,
        destinationAmount: values.destinationAmount,
        email: values.email,
        transactionId: values.transactionId,
        fiatAmount: values.fiatAmount,
        fiatCurrencyCode: values.fiatCurrencyCode,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.confirmACHQuote, options)
  };
};

operations.ConfirmTransferQuote = {};
operations.ConfirmTransferQuote.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ quoteId = undefined, assetCode = undefined }) => ({ quoteId, assetCode }))(values);
  values.__typename = __typename;
  return {
    quoteId: values.quoteId,
    assetCode: values.assetCode
  };
};
operations.ConfirmTransferQuote.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ confirmQuote = null }) => ({ confirmQuote }))(values);
  values.__typename = __typename;
  return {
    confirmQuote: !values.confirmQuote ? values.confirmQuote : ((values = {}, options = {}) => {
      const __typename = 'ConfirmedQuoteType';
      values = (({ sourceAmount = null, sourceCurrencyCode = null, destinationAmount = null, email = null, transactionId = null, fiatAmount = null, fiatCurrencyCode = null }) => ({ sourceAmount, sourceCurrencyCode, destinationAmount, email, transactionId, fiatAmount, fiatCurrencyCode }))(values);
      values.__typename = __typename;
      return {
        sourceAmount: values.sourceAmount,
        sourceCurrencyCode: values.sourceCurrencyCode,
        destinationAmount: values.destinationAmount,
        email: values.email,
        transactionId: values.transactionId,
        fiatAmount: values.fiatAmount,
        fiatCurrencyCode: values.fiatCurrencyCode,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.confirmQuote, options)
  };
};

operations.CreateACHPaymentMethod = {};
operations.CreateACHPaymentMethod.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ publicToken = undefined, plaidBankId = undefined }) => ({ publicToken, plaidBankId }))(values);
  values.__typename = __typename;
  return {
    publicToken: (values.publicToken === null || values.publicToken === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'publicToken', __typename, scalarValues: options.scalarValues }) : values.publicToken,
    plaidBankId: (values.plaidBankId === null || values.plaidBankId === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'plaidBankId', __typename, scalarValues: options.scalarValues }) : values.plaidBankId
  };
};
operations.CreateACHPaymentMethod.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ createACHPayMethod = null }) => ({ createACHPayMethod }))(values);
  values.__typename = __typename;
  return {
    createACHPayMethod: !values.createACHPayMethod ? values.createACHPayMethod : ((values = {}, options = {}) => {
      const __typename = 'PaymentMethodType';
      values = (({ id = null, lastFour = null, cardBrand = null, status = null, type = null, expirationDate = null, name = null }) => ({ id, lastFour, cardBrand, status, type, expirationDate, name }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        lastFour: values.lastFour,
        cardBrand: !values.cardBrand ? values.cardBrand : ((values = {}, options = {}) => {
          const __typename = 'CardBrand';
          values = (({ id = null, display = null, image = null }) => ({ id, display, image }))(values);
          values.__typename = __typename;
          return {
            id: values.id,
            display: values.display,
            image: values.image,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.cardBrand, options),
        status: values.status,
        type: (values.type === null || values.type === undefined) ? "ACH" : values.type,
        expirationDate: values.expirationDate,
        name: values.name,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.createACHPayMethod, options)
  };
};

operations.CreateCardAssetOrder = {};
operations.CreateCardAssetOrder.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ sourceAmount = undefined, sourceCurrency = undefined, reservationId = undefined, paymentMethodId = undefined, cvvConfirmation = undefined, destinationCurrency = undefined }) => ({ sourceAmount, sourceCurrency, reservationId, paymentMethodId, cvvConfirmation, destinationCurrency }))(values);
  values.__typename = __typename;
  return {
    sourceAmount: values.sourceAmount,
    sourceCurrency: values.sourceCurrency,
    reservationId: values.reservationId,
    paymentMethodId: values.paymentMethodId,
    cvvConfirmation: values.cvvConfirmation,
    destinationCurrency: values.destinationCurrency
  };
};
operations.CreateCardAssetOrder.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ createCardAssetOrder = null }) => ({ createCardAssetOrder }))(values);
  values.__typename = __typename;
  return {
    createCardAssetOrder: !values.createCardAssetOrder ? values.createCardAssetOrder : ((values = {}, options = {}) => {
      const __typename = 'WalletOrderTransactionType';
      values = (({ transaction = null, walletOrder = null }) => ({ transaction, walletOrder }))(values);
      values.__typename = __typename;
      return {
        transaction: !values.transaction ? values.transaction : ((values = {}, options = {}) => {
          const __typename = 'TransactionType';
          values = (({ id = null }) => ({ id }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.transaction, options),
        walletOrder: !values.walletOrder ? values.walletOrder : ((values = {}, options = {}) => {
          const __typename = 'WalletOrderType';
          values = (({ id = null, status = null, smsNeeded = null, card2faNeeded = null }) => ({ id, status, smsNeeded, card2faNeeded }))(values);
          values.__typename = __typename;
          return {
            id: values.id,
            status: (values.status === null || values.status === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'status', __typename, scalarValues: options.scalarValues }) : values.status,
            smsNeeded: values.smsNeeded,
            card2faNeeded: values.card2faNeeded,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.walletOrder, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.createCardAssetOrder, options)
  };
};

operations.CreateCardOrderReservation = {};
operations.CreateCardOrderReservation.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ sourceAmount = undefined, sourceCurrency = undefined, destinationCurrency = undefined }) => ({ sourceAmount, sourceCurrency, destinationCurrency }))(values);
  values.__typename = __typename;
  return {
    sourceAmount: values.sourceAmount,
    sourceCurrency: values.sourceCurrency,
    destinationCurrency: values.destinationCurrency
  };
};
operations.CreateCardOrderReservation.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ createCardOrderReservation = null }) => ({ createCardOrderReservation }))(values);
  values.__typename = __typename;
  return {
    createCardOrderReservation: !values.createCardOrderReservation ? values.createCardOrderReservation : ((values = {}, options = {}) => {
      const __typename = 'ReservationType';
      values = (({ reservationId = null }) => ({ reservationId }))(values);
      values.__typename = __typename;
      return {
        reservationId: values.reservationId,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.createCardOrderReservation, options)
  };
};

operations.EditCreditCard = {};
operations.EditCreditCard.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ id = undefined, cardBrand = undefined, tokenizedCardNum = undefined, tokenizedCVC = undefined, nameOnCard = undefined, expirationDate = undefined, lastFour = undefined, street = undefined, streetAdditional = undefined, city = undefined, postal = undefined, region = undefined, country = undefined }) => ({ id, cardBrand, tokenizedCardNum, tokenizedCVC, nameOnCard, expirationDate, lastFour, street, streetAdditional, city, postal, region, country }))(values);
  values.__typename = __typename;
  return {
    id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
    cardBrand: values.cardBrand,
    tokenizedCardNum: values.tokenizedCardNum,
    tokenizedCVC: values.tokenizedCVC,
    nameOnCard: values.nameOnCard,
    expirationDate: values.expirationDate,
    lastFour: values.lastFour,
    street: values.street,
    streetAdditional: values.streetAdditional,
    city: values.city,
    postal: values.postal,
    region: values.region,
    country: values.country
  };
};
operations.EditCreditCard.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ editPaymentMethod = null }) => ({ editPaymentMethod }))(values);
  values.__typename = __typename;
  return {
    editPaymentMethod: ((values = {}, options = {}) => {
      const __typename = 'PaymentMethodType';
      values = (({ id = null }) => ({ id }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.editPaymentMethod || undefined, options)
  };
};

operations.etxDistribution = {};
operations.etxDistribution.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ product = undefined, amount = undefined, amountCurrency = undefined, userEmail = undefined, transactionType = undefined }) => ({ product, amount, amountCurrency, userEmail, transactionType }))(values);
  values.__typename = __typename;
  return {
    product: (values.product === null || values.product === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'product', __typename, scalarValues: options.scalarValues }) : values.product,
    amount: (values.amount === null || values.amount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Float', mappedTypeName: 'number', fieldName: 'amount', __typename, scalarValues: options.scalarValues }) : values.amount,
    amountCurrency: (values.amountCurrency === null || values.amountCurrency === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'amountCurrency', __typename, scalarValues: options.scalarValues }) : values.amountCurrency,
    userEmail: (values.userEmail === null || values.userEmail === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userEmail', __typename, scalarValues: options.scalarValues }) : values.userEmail,
    transactionType: values.transactionType
  };
};
operations.etxDistribution.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ etxDistribution = null }) => ({ etxDistribution }))(values);
  values.__typename = __typename;
  return {
    etxDistribution: !values.etxDistribution ? values.etxDistribution : ((values = {}, options = {}) => {
      const __typename = 'EtxDistribution';
      values = (({ uuid = null, destinationAsset = null, product = null, sourceCurrencyCode = null, sourceAmount = null, distribution = null, depositAddresses = null }) => ({ uuid, destinationAsset, product, sourceCurrencyCode, sourceAmount, distribution, depositAddresses }))(values);
      values.__typename = __typename;
      return {
        uuid: (values.uuid === null || values.uuid === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'uuid', __typename, scalarValues: options.scalarValues }) : values.uuid,
        destinationAsset: !values.destinationAsset ? values.destinationAsset : ((values = {}, options = {}) => {
          const __typename = 'Price';
          values = (({ price = null }) => ({ price }))(values);
          values.__typename = __typename;
          return {
            price: (values.price === null || values.price === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Float', mappedTypeName: 'number', fieldName: 'price', __typename, scalarValues: options.scalarValues }) : values.price,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.destinationAsset, options),
        product: (values.product === null || values.product === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'product', __typename, scalarValues: options.scalarValues }) : values.product,
        sourceCurrencyCode: values.sourceCurrencyCode,
        sourceAmount: values.sourceAmount,
        distribution: !values.distribution ? values.distribution : values.distribution.map(item => ((values = {}, options = {}) => {
          const __typename = 'DistributedObjectData';
          values = (({ amount = null, currency = null }) => ({ amount, currency }))(values);
          values.__typename = __typename;
          return {
            amount: values.amount,
            currency: values.currency,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        depositAddresses: !values.depositAddresses ? values.depositAddresses : ((values = {}, options = {}) => {
          const __typename = 'DepositAddresses';
          values = (({ BTC = null, ETH = null, XLM = null, AVAX = null, MATIC = null }) => ({ BTC, ETH, XLM, AVAX, MATIC }))(values);
          values.__typename = __typename;
          return {
            BTC: values.BTC,
            ETH: values.ETH,
            XLM: values.XLM,
            AVAX: values.AVAX,
            MATIC: values.MATIC,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.depositAddresses, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.etxDistribution, options)
  };
};

operations.etxOrderDetail = {};
operations.etxOrderDetail.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ uuid = undefined }) => ({ uuid }))(values);
  values.__typename = __typename;
  return {
    uuid: (values.uuid === null || values.uuid === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'uuid', __typename, scalarValues: options.scalarValues }) : values.uuid
  };
};
operations.etxOrderDetail.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ etxOrderDetail = null }) => ({ etxOrderDetail }))(values);
  values.__typename = __typename;
  return {
    etxOrderDetail: !values.etxOrderDetail ? values.etxOrderDetail : ((values = {}, options = {}) => {
      const __typename = 'EtxOrderDetail';
      values = (({ distribution = null }) => ({ distribution }))(values);
      values.__typename = __typename;
      return {
        distribution: !values.distribution ? values.distribution : values.distribution.map(item => ((values = {}, options = {}) => {
          const __typename = 'OrderPercentageFields';
          values = (({ currencyCode = null, percentage = null, currencyName = null, image = null }) => ({ currencyCode, percentage, currencyName, image }))(values);
          values.__typename = __typename;
          return {
            currencyCode: values.currencyCode,
            percentage: values.percentage,
            currencyName: values.currencyName,
            image: values.image,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.etxOrderDetail, options)
  };
};

operations.getETXWallet = {};
operations.getETXWallet.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ notes = undefined }) => ({ notes }))(values);
  values.__typename = __typename;
  return {
    notes: values.notes
  };
};
operations.getETXWallet.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getETXBlocksWallet = null }) => ({ getETXBlocksWallet }))(values);
  values.__typename = __typename;
  return {
    getETXBlocksWallet: !values.getETXBlocksWallet ? values.getETXBlocksWallet : ((values = {}, options = {}) => {
      const __typename = 'WalletType';
      values = (({ id = null, balances = null }) => ({ id, balances }))(values);
      values.__typename = __typename;
      return {
        id: values.id,
        balances: !values.balances ? values.balances : ((values = {}, options = {}) => {
          const __typename = 'CoinBalanceType';
          values = (({ totalBalances = null, availableBalances = null }) => ({ totalBalances, availableBalances }))(values);
          values.__typename = __typename;
          return {
            totalBalances: !values.totalBalances ? values.totalBalances : values.totalBalances.map(item => ((values = {}, options = {}) => {
              const __typename = 'CoinBalance';
              values = (({ name = null, balance = null }) => ({ name, balance }))(values);
              values.__typename = __typename;
              return {
                name: values.name,
                balance: values.balance,
                ...(options.addTypename ? { __typename } : {})
              };
            })(item, options)),
            availableBalances: !values.availableBalances ? values.availableBalances : values.availableBalances.map(item => ((values = {}, options = {}) => {
              const __typename = 'CoinBalance';
              values = (({ name = null, balance = null }) => ({ name, balance }))(values);
              values.__typename = __typename;
              return {
                name: values.name,
                balance: values.balance,
                ...(options.addTypename ? { __typename } : {})
              };
            })(item, options)),
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.balances, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getETXBlocksWallet, options)
  };
};

operations.GetPlaidToken = {};
operations.GetPlaidToken.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.GetPlaidToken.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getToken = null }) => ({ getToken }))(values);
  values.__typename = __typename;
  return {
    getToken: values.getToken
  };
};

operations.PostAuthCodes = {};
operations.PostAuthCodes.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ orderId = undefined, reservationId = undefined, sms = undefined, card2Fa = undefined }) => ({ orderId, reservationId, sms, card2Fa }))(values);
  values.__typename = __typename;
  return {
    orderId: (values.orderId === null || values.orderId === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'orderId', __typename, scalarValues: options.scalarValues }) : values.orderId,
    reservationId: (values.reservationId === null || values.reservationId === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'reservationId', __typename, scalarValues: options.scalarValues }) : values.reservationId,
    sms: values.sms,
    card2Fa: values.card2Fa
  };
};
operations.PostAuthCodes.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ postAuthCodes = null }) => ({ postAuthCodes }))(values);
  values.__typename = __typename;
  return {
    postAuthCodes: values.postAuthCodes
  };
};

operations.RemovePaymentMethod = {};
operations.RemovePaymentMethod.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ id = undefined, type = undefined }) => ({ id, type }))(values);
  values.__typename = __typename;
  return {
    id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
    type: (values.type === null || values.type === undefined) ? "ACH" : values.type
  };
};
operations.RemovePaymentMethod.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ deletePaymentMethod = null }) => ({ deletePaymentMethod }))(values);
  values.__typename = __typename;
  return {
    deletePaymentMethod: ((values = {}, options = {}) => {
      const __typename = 'DeletedCardType';
      values = (({ message = null, deletedCC = null }) => ({ message, deletedCC }))(values);
      values.__typename = __typename;
      return {
        message: values.message,
        deletedCC: !values.deletedCC ? values.deletedCC : ((values = {}, options = {}) => {
          const __typename = 'PaymentMethodType';
          values = (({ id = null }) => ({ id }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.deletedCC, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.deletePaymentMethod || undefined, options)
  };
};

operations.verifyEmail = {};
operations.verifyEmail.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ email = undefined }) => ({ email }))(values);
  values.__typename = __typename;
  return {
    email: values.email
  };
};
operations.verifyEmail.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ verifyEmail = null }) => ({ verifyEmail }))(values);
  values.__typename = __typename;
  return {
    verifyEmail: values.verifyEmail
  };
};

operations.StartACHPurchaseQuote = {};
operations.StartACHPurchaseQuote.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ destAmount = undefined, sourceCurrencyCode = undefined, destinationCurrencyCode = undefined, paymentMethodId = undefined }) => ({ destAmount, sourceCurrencyCode, destinationCurrencyCode, paymentMethodId }))(values);
  values.__typename = __typename;
  return {
    destAmount: (values.destAmount === null || values.destAmount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'destAmount', __typename, scalarValues: options.scalarValues }) : values.destAmount,
    sourceCurrencyCode: (values.sourceCurrencyCode === null || values.sourceCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.sourceCurrencyCode,
    destinationCurrencyCode: (values.destinationCurrencyCode === null || values.destinationCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'destinationCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.destinationCurrencyCode,
    paymentMethodId: (values.paymentMethodId === null || values.paymentMethodId === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'paymentMethodId', __typename, scalarValues: options.scalarValues }) : values.paymentMethodId
  };
};
operations.StartACHPurchaseQuote.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ startACHPurchaseQuote = null }) => ({ startACHPurchaseQuote }))(values);
  values.__typename = __typename;
  return {
    startACHPurchaseQuote: !values.startACHPurchaseQuote ? values.startACHPurchaseQuote : ((values = {}, options = {}) => {
      const __typename = 'QuoteType';
      values = (({ quoteId = null }) => ({ quoteId }))(values);
      values.__typename = __typename;
      return {
        quoteId: values.quoteId,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.startACHPurchaseQuote, options)
  };
};

operations.startETXTransferQuote = {};
operations.startETXTransferQuote.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ etxDistributionuuid = undefined, maxOption = undefined }) => ({ etxDistributionuuid, maxOption }))(values);
  values.__typename = __typename;
  return {
    etxDistributionuuid: values.etxDistributionuuid,
    maxOption: values.maxOption
  };
};
operations.startETXTransferQuote.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ startETXTransferQuote = null }) => ({ startETXTransferQuote }))(values);
  values.__typename = __typename;
  return {
    startETXTransferQuote: !values.startETXTransferQuote ? values.startETXTransferQuote : ((values = {}, options = {}) => {
      const __typename = 'ETXTransferQuote';
      values = (({ transactionId = null }) => ({ transactionId }))(values);
      values.__typename = __typename;
      return {
        transactionId: values.transactionId,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.startETXTransferQuote, options)
  };
};

operations.startETXWithdrawlTransferQuote = {};
operations.startETXWithdrawlTransferQuote.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ etxDistributionuuid = undefined, maxOption = undefined }) => ({ etxDistributionuuid, maxOption }))(values);
  values.__typename = __typename;
  return {
    etxDistributionuuid: values.etxDistributionuuid,
    maxOption: values.maxOption
  };
};
operations.startETXWithdrawlTransferQuote.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ startETXWithdrawlTransferQuote = null }) => ({ startETXWithdrawlTransferQuote }))(values);
  values.__typename = __typename;
  return {
    startETXWithdrawlTransferQuote: !values.startETXWithdrawlTransferQuote ? values.startETXWithdrawlTransferQuote : ((values = {}, options = {}) => {
      const __typename = 'ETXTransferQuote';
      values = (({ transactionId = null }) => ({ transactionId }))(values);
      values.__typename = __typename;
      return {
        transactionId: values.transactionId,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.startETXWithdrawlTransferQuote, options)
  };
};

operations.StartPayoutQuote = {};
operations.StartPayoutQuote.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ sourceCurrencyCode = undefined, destinationCurrencyCode = undefined, destAmount = undefined, bankAccountId = undefined, maxOption = undefined }) => ({ sourceCurrencyCode, destinationCurrencyCode, destAmount, bankAccountId, maxOption }))(values);
  values.__typename = __typename;
  return {
    sourceCurrencyCode: values.sourceCurrencyCode,
    destinationCurrencyCode: values.destinationCurrencyCode,
    destAmount: values.destAmount,
    bankAccountId: values.bankAccountId,
    maxOption: values.maxOption
  };
};
operations.StartPayoutQuote.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ startPayoutQuote = null }) => ({ startPayoutQuote }))(values);
  values.__typename = __typename;
  return {
    startPayoutQuote: !values.startPayoutQuote ? values.startPayoutQuote : ((values = {}, options = {}) => {
      const __typename = 'QuoteType';
      values = (({ quoteId = null, sourceCurrency = null, sourceAmount = null, sourceCurrencyCode = null, destinationCurrency = null, destinationCurrencyCode = null, destinationAmount = null, exchangeRate = null, expiresAt = null, fiatFees = null, sourceFee = null }) => ({ quoteId, sourceCurrency, sourceAmount, sourceCurrencyCode, destinationCurrency, destinationCurrencyCode, destinationAmount, exchangeRate, expiresAt, fiatFees, sourceFee }))(values);
      values.__typename = __typename;
      return {
        quoteId: values.quoteId,
        sourceCurrency: (values.sourceCurrency === null || values.sourceCurrency === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceCurrency', __typename, scalarValues: options.scalarValues }) : values.sourceCurrency,
        sourceAmount: (values.sourceAmount === null || values.sourceAmount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceAmount', __typename, scalarValues: options.scalarValues }) : values.sourceAmount,
        sourceCurrencyCode: (values.sourceCurrencyCode === null || values.sourceCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.sourceCurrencyCode,
        destinationCurrency: values.destinationCurrency,
        destinationCurrencyCode: values.destinationCurrencyCode,
        destinationAmount: values.destinationAmount,
        exchangeRate: values.exchangeRate,
        expiresAt: values.expiresAt,
        fiatFees: values.fiatFees,
        sourceFee: values.sourceFee,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.startPayoutQuote, options)
  };
};

operations.StartQuote = {};
operations.StartQuote.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ destAmount = undefined, sourceCurrencyCode = undefined, destinationCurrencyCode = undefined }) => ({ destAmount, sourceCurrencyCode, destinationCurrencyCode }))(values);
  values.__typename = __typename;
  return {
    destAmount: (values.destAmount === null || values.destAmount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'destAmount', __typename, scalarValues: options.scalarValues }) : values.destAmount,
    sourceCurrencyCode: (values.sourceCurrencyCode === null || values.sourceCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.sourceCurrencyCode,
    destinationCurrencyCode: (values.destinationCurrencyCode === null || values.destinationCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'destinationCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.destinationCurrencyCode
  };
};
operations.StartQuote.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ startQuote = null }) => ({ startQuote }))(values);
  values.__typename = __typename;
  return {
    startQuote: !values.startQuote ? values.startQuote : ((values = {}, options = {}) => {
      const __typename = 'QuoteType';
      values = (({ quoteId = null }) => ({ quoteId }))(values);
      values.__typename = __typename;
      return {
        quoteId: values.quoteId,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.startQuote, options)
  };
};

operations.StartTransferQuote = {};
operations.StartTransferQuote.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ sourceCurrencyCode = undefined, destinationCurrencyCode = undefined, sourceAmount = undefined, externalAddress = undefined, notes = undefined }) => ({ sourceCurrencyCode, destinationCurrencyCode, sourceAmount, externalAddress, notes }))(values);
  values.__typename = __typename;
  return {
    sourceCurrencyCode: values.sourceCurrencyCode,
    destinationCurrencyCode: values.destinationCurrencyCode,
    sourceAmount: (values.sourceAmount === null || values.sourceAmount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceAmount', __typename, scalarValues: options.scalarValues }) : values.sourceAmount,
    externalAddress: values.externalAddress,
    notes: values.notes
  };
};
operations.StartTransferQuote.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ startExternalTransferQuote = null }) => ({ startExternalTransferQuote }))(values);
  values.__typename = __typename;
  return {
    startExternalTransferQuote: !values.startExternalTransferQuote ? values.startExternalTransferQuote : ((values = {}, options = {}) => {
      const __typename = 'QuoteType';
      values = (({ quoteId = null }) => ({ quoteId }))(values);
      values.__typename = __typename;
      return {
        quoteId: values.quoteId,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.startExternalTransferQuote, options)
  };
};

operations.startUserTransferQuote = {};
operations.startUserTransferQuote.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ sourceCurrencyCode = undefined, destAmount = undefined, sourceAmount = undefined, destinationCurrencyCode = undefined, destination = undefined, notes = undefined, maxOption = undefined }) => ({ sourceCurrencyCode, destAmount, sourceAmount, destinationCurrencyCode, destination, notes, maxOption }))(values);
  values.__typename = __typename;
  return {
    sourceCurrencyCode: values.sourceCurrencyCode,
    destAmount: values.destAmount,
    sourceAmount: (values.sourceAmount === null || values.sourceAmount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceAmount', __typename, scalarValues: options.scalarValues }) : values.sourceAmount,
    destinationCurrencyCode: values.destinationCurrencyCode,
    destination: values.destination,
    notes: values.notes,
    maxOption: values.maxOption
  };
};
operations.startUserTransferQuote.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ startUserTransferQuote = null }) => ({ startUserTransferQuote }))(values);
  values.__typename = __typename;
  return {
    startUserTransferQuote: !values.startUserTransferQuote ? values.startUserTransferQuote : ((values = {}, options = {}) => {
      const __typename = 'QuoteType';
      values = (({ quoteId = null }) => ({ quoteId }))(values);
      values.__typename = __typename;
      return {
        quoteId: values.quoteId,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.startUserTransferQuote, options)
  };
};

operations.updateAccount = {};
operations.updateAccount.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ country = undefined, city = undefined, phone = undefined }) => ({ country, city, phone }))(values);
  values.__typename = __typename;
  return {
    country: values.country,
    city: values.city,
    phone: values.phone
  };
};
operations.updateAccount.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ updateAccount = null }) => ({ updateAccount }))(values);
  values.__typename = __typename;
  return {
    updateAccount: !values.updateAccount ? values.updateAccount : ((values = {}, options = {}) => {
      const __typename = 'AccountType';
      values = (({ country = null, phone = null, city = null }) => ({ country, phone, city }))(values);
      values.__typename = __typename;
      return {
        country: !values.country ? values.country : ((values = {}, options = {}) => {
          const __typename = 'CountryType';
          values = (({ name = null, alpha2 = null }) => ({ name, alpha2 }))(values);
          values.__typename = __typename;
          return {
            name: values.name,
            alpha2: values.alpha2,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.country, options),
        phone: values.phone,
        city: values.city,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.updateAccount, options)
  };
};

operations.updateStripeBanking = {};
operations.updateStripeBanking.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ routingNumber = undefined, accountNumber = undefined }) => ({ routingNumber, accountNumber }))(values);
  values.__typename = __typename;
  return {
    routingNumber: values.routingNumber,
    accountNumber: values.accountNumber
  };
};
operations.updateStripeBanking.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ updateStripeBanking = null }) => ({ updateStripeBanking }))(values);
  values.__typename = __typename;
  return {
    updateStripeBanking: !values.updateStripeBanking ? values.updateStripeBanking : ((values = {}, options = {}) => {
      const __typename = 'StripeOutputType';
      values = (({ status = null, verificationRequirements = null }) => ({ status, verificationRequirements }))(values);
      values.__typename = __typename;
      return {
        status: values.status,
        verificationRequirements: values.verificationRequirements,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.updateStripeBanking, options)
  };
};

operations.UpdateMerchantProfile = {};
operations.UpdateMerchantProfile.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ phoneNumber = undefined, displayName = undefined, currency = undefined, location = undefined, merchantType = undefined }) => ({ phoneNumber, displayName, currency, location, merchantType }))(values);
  values.__typename = __typename;
  return {
    phoneNumber: values.phoneNumber,
    displayName: values.displayName,
    currency: values.currency,
    location: !values.location ? values.location : (AddressInput)(values.location, options),
    merchantType: values.merchantType
  };
};
operations.UpdateMerchantProfile.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ updateMerchantProfile = null }) => ({ updateMerchantProfile }))(values);
  values.__typename = __typename;
  return {
    updateMerchantProfile: !values.updateMerchantProfile ? values.updateMerchantProfile : ((values = {}, options = {}) => {
      const __typename = 'MerchantProfileType';
      values = (({ id = null, merchantType = null, displayName = null, address = null, currency = null, countryCode = null, acceptsPayments = null }) => ({ id, merchantType, displayName, address, currency, countryCode, acceptsPayments }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        merchantType: values.merchantType,
        displayName: values.displayName,
        address: !values.address ? values.address : ((values = {}, options = {}) => {
          const __typename = 'AddressType';
          values = (({ street = null, streetAdditional = null, city = null, region = null, postal = null }) => ({ street, streetAdditional, city, region, postal }))(values);
          values.__typename = __typename;
          return {
            street: values.street,
            streetAdditional: values.streetAdditional,
            city: values.city,
            region: values.region,
            postal: values.postal,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.address, options),
        currency: values.currency,
        countryCode: values.countryCode,
        acceptsPayments: values.acceptsPayments,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.updateMerchantProfile, options)
  };
};

operations.updateUserProfile = {};
operations.updateUserProfile.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ firstName = undefined, lastName = undefined }) => ({ firstName, lastName }))(values);
  values.__typename = __typename;
  return {
    firstName: values.firstName,
    lastName: values.lastName
  };
};
operations.updateUserProfile.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ modifyUserProfile = null }) => ({ modifyUserProfile }))(values);
  values.__typename = __typename;
  return {
    modifyUserProfile: !values.modifyUserProfile ? values.modifyUserProfile : ((values = {}, options = {}) => {
      const __typename = 'AccountType';
      values = (({ id = null }) => ({ id }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.modifyUserProfile, options)
  };
};

operations.updateKYCInfo = {};
operations.updateKYCInfo.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ legalFirstName = undefined, legalLastName = undefined, address = undefined, individualSsn = undefined, dateOFBirth = undefined, govIdType = undefined, govIdFront = undefined, govIdBack = undefined }) => ({ legalFirstName, legalLastName, address, individualSsn, dateOFBirth, govIdType, govIdFront, govIdBack }))(values);
  values.__typename = __typename;
  return {
    legalFirstName: (values.legalFirstName === null || values.legalFirstName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'legalFirstName', __typename, scalarValues: options.scalarValues }) : values.legalFirstName,
    legalLastName: (values.legalLastName === null || values.legalLastName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'legalLastName', __typename, scalarValues: options.scalarValues }) : values.legalLastName,
    address: (AddressInput)(values.address || undefined, options),
    individualSsn: (values.individualSsn === null || values.individualSsn === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'individualSsn', __typename, scalarValues: options.scalarValues }) : values.individualSsn,
    dateOFBirth: (BirthdayInput)(values.dateOFBirth || undefined, options),
    govIdType: (values.govIdType === null || values.govIdType === undefined) ? "DRIVING_LICENSE" : values.govIdType,
    govIdFront: (values.govIdFront === null || values.govIdFront === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'govIdFront', __typename, scalarValues: options.scalarValues }) : values.govIdFront,
    govIdBack: values.govIdBack
  };
};
operations.updateKYCInfo.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ enterKYCInfo = null }) => ({ enterKYCInfo }))(values);
  values.__typename = __typename;
  return {
    enterKYCInfo: !values.enterKYCInfo ? values.enterKYCInfo : ((values = {}, options = {}) => {
      const __typename = 'UploadStatus';
      values = (({ confirmedUpload = null, fields = null, generalError = null, persistanceError = null }) => ({ confirmedUpload, fields, generalError, persistanceError }))(values);
      values.__typename = __typename;
      return {
        confirmedUpload: values.confirmedUpload,
        fields: !values.fields ? values.fields : values.fields.map(item => ((values = {}, options = {}) => {
          const __typename = 'UploadStatuses';
          values = (({ name = null, status = null }) => ({ name, status }))(values);
          values.__typename = __typename;
          return {
            name: values.name,
            status: values.status,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        generalError: values.generalError,
        persistanceError: values.persistanceError,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.enterKYCInfo, options)
  };
};

operations.UpdateStripeAccount = {};
operations.UpdateStripeAccount.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ persons = undefined, business = undefined }) => ({ persons, business }))(values);
  values.__typename = __typename;
  return {
    persons: !values.persons ? values.persons : values.persons.map(item => (StripeUpdatePersonFieldsInput)(item, options)),
    business: !values.business ? values.business : (StripeUpdateBusinessFieldsInput)(values.business, options)
  };
};
operations.UpdateStripeAccount.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ updateStripeAccount = null }) => ({ updateStripeAccount }))(values);
  values.__typename = __typename;
  return {
    updateStripeAccount: values.updateStripeAccount
  };
};

operations.AddBankingInfo = {};
operations.AddBankingInfo.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ phoneNumber = undefined, dob = undefined, firstName = undefined, lastName = undefined, address = undefined, accountType = undefined, bankName = undefined, bankAccountNickname = undefined, accountNumber = undefined, routingNumber = undefined, clabe = undefined, bsbNumber = undefined }) => ({ phoneNumber, dob, firstName, lastName, address, accountType, bankName, bankAccountNickname, accountNumber, routingNumber, clabe, bsbNumber }))(values);
  values.__typename = __typename;
  return {
    phoneNumber: values.phoneNumber,
    dob: !values.dob ? values.dob : (BirthdayInput)(values.dob, options),
    firstName: values.firstName,
    lastName: values.lastName,
    address: !values.address ? values.address : (AddressInput)(values.address, options),
    accountType: values.accountType,
    bankName: values.bankName,
    bankAccountNickname: values.bankAccountNickname,
    accountNumber: values.accountNumber,
    routingNumber: values.routingNumber,
    clabe: values.clabe,
    bsbNumber: values.bsbNumber
  };
};
operations.AddBankingInfo.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ addBankingInfo = null }) => ({ addBankingInfo }))(values);
  values.__typename = __typename;
  return {
    addBankingInfo: !values.addBankingInfo ? values.addBankingInfo : ((values = {}, options = {}) => {
      const __typename = 'BankType';
      values = (({ id = null, lastFour = null, nickname = null, country = null, accountHolder = null, account = null }) => ({ id, lastFour, nickname, country, accountHolder, account }))(values);
      values.__typename = __typename;
      return {
        id: values.id,
        lastFour: values.lastFour,
        nickname: values.nickname,
        country: values.country,
        accountHolder: values.accountHolder,
        account: !values.account ? values.account : ((values = {}, options = {}) => {
          const __typename = 'AccountType';
          values = (({ id = null, userName = null }) => ({ id, userName }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.account, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.addBankingInfo, options)
  };
};

operations.confirmQuote = {};
operations.confirmQuote.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ quoteId = undefined }) => ({ quoteId }))(values);
  values.__typename = __typename;
  return {
    quoteId: values.quoteId
  };
};
operations.confirmQuote.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ confirmQuote = null }) => ({ confirmQuote }))(values);
  values.__typename = __typename;
  return {
    confirmQuote: !values.confirmQuote ? values.confirmQuote : ((values = {}, options = {}) => {
      const __typename = 'ConfirmedQuoteType';
      values = (({ destinationAmount = null, destinationCurrency = null, destinationCurrencyCode = null, transactionId = null, email = null }) => ({ destinationAmount, destinationCurrency, destinationCurrencyCode, transactionId, email }))(values);
      values.__typename = __typename;
      return {
        destinationAmount: values.destinationAmount,
        destinationCurrency: values.destinationCurrency,
        destinationCurrencyCode: values.destinationCurrencyCode,
        transactionId: values.transactionId,
        email: values.email,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.confirmQuote, options)
  };
};

operations.deleteBank = {};
operations.deleteBank.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ bankId = undefined }) => ({ bankId }))(values);
  values.__typename = __typename;
  return {
    bankId: values.bankId
  };
};
operations.deleteBank.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ deleteBank = null }) => ({ deleteBank }))(values);
  values.__typename = __typename;
  return {
    deleteBank: values.deleteBank
  };
};

operations.getAccountsByGeom = {};
operations.getAccountsByGeom.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ geom = undefined }) => ({ geom }))(values);
  values.__typename = __typename;
  return {
    geom: !values.geom ? values.geom : (GeometricSearchInput)(values.geom, options)
  };
};
operations.getAccountsByGeom.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ searchAccountsByGeom = null }) => ({ searchAccountsByGeom }))(values);
  values.__typename = __typename;
  return {
    searchAccountsByGeom: !values.searchAccountsByGeom ? values.searchAccountsByGeom : values.searchAccountsByGeom.map(item => ((values = {}, options = {}) => {
      const __typename = 'AccountType';
      values = (({ id = null, displayName = null, userName = null, image = null, merchantProfileDetails = null }) => ({ id, displayName, userName, image, merchantProfileDetails }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
        userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
        image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
        merchantProfileDetails: !values.merchantProfileDetails ? values.merchantProfileDetails : ((values = {}, options = {}) => {
          const __typename = 'MerchantProfileType';
          values = (({ geom = null, acceptsPayments = null }) => ({ geom, acceptsPayments }))(values);
          values.__typename = __typename;
          return {
            geom: values.geom,
            acceptsPayments: values.acceptsPayments,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.merchantProfileDetails, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.GETASSETHISTORY = {};
operations.GETASSETHISTORY.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ assetName = undefined, period = undefined }) => ({ assetName, period }))(values);
  values.__typename = __typename;
  return {
    assetName: values.assetName,
    period: values.period
  };
};
operations.GETASSETHISTORY.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getAssetHistory = null }) => ({ getAssetHistory }))(values);
  values.__typename = __typename;
  return {
    getAssetHistory: !values.getAssetHistory ? values.getAssetHistory : ((values = {}, options = {}) => {
      const __typename = 'SingleAssetHistoryType';
      values = (({ asset = null, minPrice = null, maxPrice = null, firstValidPointIndex = null, start = null, end = null, history = null }) => ({ asset, minPrice, maxPrice, firstValidPointIndex, start, end, history }))(values);
      values.__typename = __typename;
      return {
        asset: !values.asset ? values.asset : ((values = {}, options = {}) => {
          const __typename = 'AssetType';
          values = (({ name = null, code = null }) => ({ name, code }))(values);
          values.__typename = __typename;
          return {
            name: values.name,
            code: values.code,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.asset, options),
        minPrice: values.minPrice,
        maxPrice: values.maxPrice,
        firstValidPointIndex: values.firstValidPointIndex,
        start: values.start,
        end: values.end,
        history: !values.history ? values.history : values.history.map(item => ((values = {}, options = {}) => {
          const __typename = 'AssetHistoryPointType';
          values = (({ time = null, price = null }) => ({ time, price }))(values);
          values.__typename = __typename;
          return {
            time: values.time,
            price: values.price,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getAssetHistory, options)
  };
};

operations.GETASSETMETRIC = {};
operations.GETASSETMETRIC.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ assetName = undefined }) => ({ assetName }))(values);
  values.__typename = __typename;
  return {
    assetName: values.assetName
  };
};
operations.GETASSETMETRIC.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getAssetMetrics = null }) => ({ getAssetMetrics }))(values);
  values.__typename = __typename;
  return {
    getAssetMetrics: !values.getAssetMetrics ? values.getAssetMetrics : ((values = {}, options = {}) => {
      const __typename = 'AssetMetricType';
      values = (({ name = null, code = null, logoImage = null, price = null }) => ({ name, code, logoImage, price }))(values);
      values.__typename = __typename;
      return {
        name: values.name,
        code: values.code,
        logoImage: values.logoImage,
        price: values.price,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getAssetMetrics, options)
  };
};

operations.GetMyMerchantProfile = {};
operations.GetMyMerchantProfile.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.GetMyMerchantProfile.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ myMerchantProfile = null }) => ({ myMerchantProfile }))(values);
  values.__typename = __typename;
  return {
    myMerchantProfile: !values.myMerchantProfile ? values.myMerchantProfile : ((values = {}, options = {}) => {
      const __typename = 'MerchantProfileType';
      values = (({ id = null, displayName = null, merchantType = null, currency = null, address = null, country = null, acceptsPayments = null, countryCode = null, payoutsEnabled = null, businessDetails = null }) => ({ id, displayName, merchantType, currency, address, country, acceptsPayments, countryCode, payoutsEnabled, businessDetails }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        displayName: values.displayName,
        merchantType: values.merchantType,
        currency: values.currency,
        address: !values.address ? values.address : ((values = {}, options = {}) => {
          const __typename = 'AddressType';
          values = (({ street = null, streetAdditional = null, city = null, region = null, postal = null }) => ({ street, streetAdditional, city, region, postal }))(values);
          values.__typename = __typename;
          return {
            street: values.street,
            streetAdditional: values.streetAdditional,
            city: values.city,
            region: values.region,
            postal: values.postal,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.address, options),
        country: !values.country ? values.country : ((values = {}, options = {}) => {
          const __typename = 'CountryType';
          values = (({ name = null, alpha2 = null }) => ({ name, alpha2 }))(values);
          values.__typename = __typename;
          return {
            name: values.name,
            alpha2: values.alpha2,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.country, options),
        acceptsPayments: values.acceptsPayments,
        countryCode: values.countryCode,
        payoutsEnabled: values.payoutsEnabled,
        businessDetails: !values.businessDetails ? values.businessDetails : ((values = {}, options = {}) => {
          const __typename = 'BusinessDetailType';
          values = (({ type = null, hasBanking = null, hasOnboarded = null }) => ({ type, hasBanking, hasOnboarded }))(values);
          values.__typename = __typename;
          return {
            type: values.type,
            hasBanking: values.hasBanking,
            hasOnboarded: values.hasOnboarded,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.businessDetails, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.myMerchantProfile, options)
  };
};

operations.GetOrder = {};
operations.GetOrder.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ orderId = undefined, merchantId = undefined }) => ({ orderId, merchantId }))(values);
  values.__typename = __typename;
  return {
    orderId: (values.orderId === null || values.orderId === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'orderId', __typename, scalarValues: options.scalarValues }) : values.orderId,
    merchantId: (values.merchantId === null || values.merchantId === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'merchantId', __typename, scalarValues: options.scalarValues }) : values.merchantId
  };
};
operations.GetOrder.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ paymentMethods = null, getOrder = null }) => ({ paymentMethods, getOrder }))(values);
  values.__typename = __typename;
  return {
    paymentMethods: (values.paymentMethods || []).map(item => ((values = {}, options = {}) => {
      const __typename = 'PaymentMethodType';
      values = (({ id = null, name = null, lastFour = null, type = null, expirationDate = null, cardBrand = null }) => ({ id, name, lastFour, type, expirationDate, cardBrand }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        name: values.name,
        lastFour: values.lastFour,
        type: (values.type === null || values.type === undefined) ? "ACH" : values.type,
        expirationDate: values.expirationDate,
        cardBrand: !values.cardBrand ? values.cardBrand : ((values = {}, options = {}) => {
          const __typename = 'CardBrand';
          values = (({ id = null, image = null, display = null }) => ({ id, image, display }))(values);
          values.__typename = __typename;
          return {
            id: values.id,
            image: values.image,
            display: values.display,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.cardBrand, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options)),
    getOrder: !values.getOrder ? values.getOrder : ((values = {}, options = {}) => {
      const __typename = 'OrderType';
      values = (({ orderId = null, eventId = null, orderTotal = null, orderFees = null, orderSubtotal = null, paymentEntered = null, timeRemainingInSecs = null, tickets = null }) => ({ orderId, eventId, orderTotal, orderFees, orderSubtotal, paymentEntered, timeRemainingInSecs, tickets }))(values);
      values.__typename = __typename;
      return {
        orderId: (values.orderId === null || values.orderId === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'orderId', __typename, scalarValues: options.scalarValues }) : values.orderId,
        eventId: values.eventId,
        orderTotal: !values.orderTotal ? values.orderTotal : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ value = null, display = null }) => ({ value, display }))(values);
          values.__typename = __typename;
          return {
            value: values.value,
            display: values.display,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.orderTotal, options),
        orderFees: !values.orderFees ? values.orderFees : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ value = null, display = null }) => ({ value, display }))(values);
          values.__typename = __typename;
          return {
            value: values.value,
            display: values.display,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.orderFees, options),
        orderSubtotal: !values.orderSubtotal ? values.orderSubtotal : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ value = null, display = null }) => ({ value, display }))(values);
          values.__typename = __typename;
          return {
            value: values.value,
            display: values.display,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.orderSubtotal, options),
        paymentEntered: values.paymentEntered,
        timeRemainingInSecs: values.timeRemainingInSecs,
        tickets: !values.tickets ? values.tickets : values.tickets.map(item => ((values = {}, options = {}) => {
          const __typename = 'TicketConfirmationType';
          values = (({ id = null, type = null, subtotalPrice = null, price = null, quantity = null }) => ({ id, type, subtotalPrice, price, quantity }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            type: values.type,
            subtotalPrice: !values.subtotalPrice ? values.subtotalPrice : ((values = {}, options = {}) => {
              const __typename = 'ValueDisplay';
              values = (({ value = null, display = null, major = null }) => ({ value, display, major }))(values);
              values.__typename = __typename;
              return {
                value: values.value,
                display: values.display,
                major: values.major,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.subtotalPrice, options),
            price: !values.price ? values.price : ((values = {}, options = {}) => {
              const __typename = 'ValueDisplay';
              values = (({ value = null, display = null, major = null }) => ({ value, display, major }))(values);
              values.__typename = __typename;
              return {
                value: values.value,
                display: values.display,
                major: values.major,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.price, options),
            quantity: values.quantity,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getOrder, options)
  };
};

operations.GetPaymentMethod = {};
operations.GetPaymentMethod.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ id = undefined }) => ({ id }))(values);
  values.__typename = __typename;
  return {
    id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id
  };
};
operations.GetPaymentMethod.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ paymentMethod = null }) => ({ paymentMethod }))(values);
  values.__typename = __typename;
  return {
    paymentMethod: ((values = {}, options = {}) => {
      const __typename = 'PaymentMethodType';
      values = (({ id = null, lastFour = null, cardBrand = null, type = null, expirationDate = null, name = null, streetAddress = null, streetAdditional = null, cityAddress = null, PostalAddress = null, country = null, region = null }) => ({ id, lastFour, cardBrand, type, expirationDate, name, streetAddress, streetAdditional, cityAddress, PostalAddress, country, region }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        lastFour: values.lastFour,
        cardBrand: !values.cardBrand ? values.cardBrand : ((values = {}, options = {}) => {
          const __typename = 'CardBrand';
          values = (({ id = null, display = null, image = null }) => ({ id, display, image }))(values);
          values.__typename = __typename;
          return {
            id: values.id,
            display: values.display,
            image: values.image,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.cardBrand, options),
        type: (values.type === null || values.type === undefined) ? "ACH" : values.type,
        expirationDate: values.expirationDate,
        name: values.name,
        streetAddress: values.streetAddress,
        streetAdditional: values.streetAdditional,
        cityAddress: values.cityAddress,
        PostalAddress: values.PostalAddress,
        country: values.country,
        region: values.region,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.paymentMethod || undefined, options)
  };
};

operations.GetTransaction = {};
operations.GetTransaction.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ id = undefined }) => ({ id }))(values);
  values.__typename = __typename;
  return {
    id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id
  };
};
operations.GetTransaction.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ transaction = null }) => ({ transaction }))(values);
  values.__typename = __typename;
  return {
    transaction: !values.transaction ? values.transaction : ((values = {}, options = {}) => {
      const __typename = 'TransactionType';
      values = (({ id = null, sender = null, receiver = null, dateOfTransaction = null, amount = null, tipAmount = null, total = null, currency = null, txDetail = null, isRefunded = null }) => ({ id, sender, receiver, dateOfTransaction, amount, tipAmount, total, currency, txDetail, isRefunded }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        sender: !values.sender ? values.sender : ((values = {}, options = {}) => {
          const __typename = 'AccountType';
          values = (({ id = null, image = null, userName = null, displayName = null }) => ({ id, image, userName, displayName }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
            userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
            displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.sender, options),
        receiver: !values.receiver ? values.receiver : ((values = {}, options = {}) => {
          const __typename = 'AccountType';
          values = (({ id = null, userName = null, displayName = null, image = null }) => ({ id, userName, displayName, image }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
            displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
            image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.receiver, options),
        dateOfTransaction: values.dateOfTransaction,
        amount: values.amount,
        tipAmount: !values.tipAmount ? values.tipAmount : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ major = null, value = null, display = null }) => ({ major, value, display }))(values);
          values.__typename = __typename;
          return {
            major: values.major,
            value: values.value,
            display: values.display,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.tipAmount, options),
        total: !values.total ? values.total : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ major = null, value = null, display = null }) => ({ major, value, display }))(values);
          values.__typename = __typename;
          return {
            major: values.major,
            value: values.value,
            display: values.display,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.total, options),
        currency: values.currency,
        txDetail: values.txDetail,
        isRefunded: values.isRefunded,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.transaction, options)
  };
};

operations.GetTransactions = {};
operations.GetTransactions.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ limit = undefined, page = undefined }) => ({ limit, page }))(values);
  values.__typename = __typename;
  return {
    limit: values.limit,
    page: values.page
  };
};
operations.GetTransactions.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getTransactions = null }) => ({ getTransactions }))(values);
  values.__typename = __typename;
  return {
    getTransactions: !values.getTransactions ? values.getTransactions : ((values = {}, options = {}) => {
      const __typename = 'TransactionResultsType';
      values = (({ pageInfo = null, nodes = null }) => ({ pageInfo, nodes }))(values);
      values.__typename = __typename;
      return {
        pageInfo: ((values = {}, options = {}) => {
          const __typename = 'PageInfo';
          values = (({ currentPage = null, totalPages = null, totalCount = null, perPage = null }) => ({ currentPage, totalPages, totalCount, perPage }))(values);
          values.__typename = __typename;
          return {
            currentPage: values.currentPage,
            totalPages: values.totalPages,
            totalCount: values.totalCount,
            perPage: values.perPage,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.pageInfo || undefined, options),
        nodes: !values.nodes ? values.nodes : values.nodes.map(item => ((values = {}, options = {}) => {
          const __typename = 'TransactionType';
          values = (({ origin = null, id = null, amount = null, currency = null, transactionType = null, dateOfTransaction = null, total = null, destination = null }) => ({ origin, id, amount, currency, transactionType, dateOfTransaction, total, destination }))(values);
          values.__typename = __typename;
          return {
            origin: !values.origin ? values.origin : ((values = {}, options = {}) => {
              const __typename = 'AccountType';
              values = (({ userName = null }) => ({ userName }))(values);
              values.__typename = __typename;
              return {
                userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.origin, options),
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            amount: values.amount,
            currency: values.currency,
            transactionType: values.transactionType,
            dateOfTransaction: values.dateOfTransaction,
            total: !values.total ? values.total : ((values = {}, options = {}) => {
              const __typename = 'ValueDisplay';
              values = (({ major = null, value = null, display = null }) => ({ major, value, display }))(values);
              values.__typename = __typename;
              return {
                major: values.major,
                value: values.value,
                display: values.display,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.total, options),
            destination: !values.destination ? values.destination : ((values = {}, options = {}) => {
              const __typename = 'AccountType';
              values = (({ id = null, userName = null, displayName = null, image = null }) => ({ id, userName, displayName, image }))(values);
              values.__typename = __typename;
              return {
                id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
                userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
                displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
                image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.destination, options),
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getTransactions, options)
  };
};

operations.GetTransactionsToMe = {};
operations.GetTransactionsToMe.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ limit = undefined, page = undefined }) => ({ limit, page }))(values);
  values.__typename = __typename;
  return {
    limit: values.limit,
    page: values.page
  };
};
operations.GetTransactionsToMe.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ transactionsToMe = null }) => ({ transactionsToMe }))(values);
  values.__typename = __typename;
  return {
    transactionsToMe: !values.transactionsToMe ? values.transactionsToMe : ((values = {}, options = {}) => {
      const __typename = 'TransactionResultsType';
      values = (({ pageInfo = null, nodes = null }) => ({ pageInfo, nodes }))(values);
      values.__typename = __typename;
      return {
        pageInfo: ((values = {}, options = {}) => {
          const __typename = 'PageInfo';
          values = (({ currentPage = null, totalPages = null, totalCount = null, perPage = null }) => ({ currentPage, totalPages, totalCount, perPage }))(values);
          values.__typename = __typename;
          return {
            currentPage: values.currentPage,
            totalPages: values.totalPages,
            totalCount: values.totalCount,
            perPage: values.perPage,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.pageInfo || undefined, options),
        nodes: !values.nodes ? values.nodes : values.nodes.map(item => ((values = {}, options = {}) => {
          const __typename = 'TransactionType';
          values = (({ id = null, amount = null, total = null, currency = null, transactionType = null, dateOfTransaction = null, origin = null }) => ({ id, amount, total, currency, transactionType, dateOfTransaction, origin }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            amount: values.amount,
            total: !values.total ? values.total : ((values = {}, options = {}) => {
              const __typename = 'ValueDisplay';
              values = (({ major = null, value = null, display = null }) => ({ major, value, display }))(values);
              values.__typename = __typename;
              return {
                major: values.major,
                value: values.value,
                display: values.display,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.total, options),
            currency: values.currency,
            transactionType: values.transactionType,
            dateOfTransaction: values.dateOfTransaction,
            origin: !values.origin ? values.origin : ((values = {}, options = {}) => {
              const __typename = 'AccountType';
              values = (({ id = null, userName = null, displayName = null, image = null }) => ({ id, userName, displayName, image }))(values);
              values.__typename = __typename;
              return {
                id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
                userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
                displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
                image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.origin, options),
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.transactionsToMe, options)
  };
};

operations.GetACHQuote = {};
operations.GetACHQuote.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ quoteId = undefined, destinationAssetCode = undefined }) => ({ quoteId, destinationAssetCode }))(values);
  values.__typename = __typename;
  return {
    quoteId: values.quoteId,
    destinationAssetCode: values.destinationAssetCode
  };
};
operations.GetACHQuote.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ destinationAsset = null, quote = null }) => ({ destinationAsset, quote }))(values);
  values.__typename = __typename;
  return {
    destinationAsset: !values.destinationAsset ? values.destinationAsset : ((values = {}, options = {}) => {
      const __typename = 'AssetMetricType';
      values = (({ price = null }) => ({ price }))(values);
      values.__typename = __typename;
      return {
        price: values.price,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.destinationAsset, options),
    quote: !values.quote ? values.quote : ((values = {}, options = {}) => {
      const __typename = 'QuoteType';
      values = (({ paymentName = null, sourceCurrency = null, sourceCurrencyCode = null, sourceAmount = null, destinationCurrency = null, destinationCurrencyCode = null, destinationAmount = null, sourceFee = null, exchangeRate = null, notes = null, logoImage = null, fiatFees = null, fiatAmount = null, fiatCurrencyCode = null, destination = null, isInternal = null }) => ({ paymentName, sourceCurrency, sourceCurrencyCode, sourceAmount, destinationCurrency, destinationCurrencyCode, destinationAmount, sourceFee, exchangeRate, notes, logoImage, fiatFees, fiatAmount, fiatCurrencyCode, destination, isInternal }))(values);
      values.__typename = __typename;
      return {
        paymentName: values.paymentName,
        sourceCurrency: (values.sourceCurrency === null || values.sourceCurrency === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceCurrency', __typename, scalarValues: options.scalarValues }) : values.sourceCurrency,
        sourceCurrencyCode: (values.sourceCurrencyCode === null || values.sourceCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.sourceCurrencyCode,
        sourceAmount: (values.sourceAmount === null || values.sourceAmount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceAmount', __typename, scalarValues: options.scalarValues }) : values.sourceAmount,
        destinationCurrency: values.destinationCurrency,
        destinationCurrencyCode: values.destinationCurrencyCode,
        destinationAmount: values.destinationAmount,
        sourceFee: values.sourceFee,
        exchangeRate: values.exchangeRate,
        notes: values.notes,
        logoImage: values.logoImage,
        fiatFees: values.fiatFees,
        fiatAmount: (values.fiatAmount === null || values.fiatAmount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Float', mappedTypeName: 'number', fieldName: 'fiatAmount', __typename, scalarValues: options.scalarValues }) : values.fiatAmount,
        fiatCurrencyCode: (values.fiatCurrencyCode === null || values.fiatCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'fiatCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.fiatCurrencyCode,
        destination: (values.destination === null || values.destination === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'destination', __typename, scalarValues: options.scalarValues }) : values.destination,
        isInternal: values.isInternal,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.quote, options)
  };
};

operations.getAccountById = {};
operations.getAccountById.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ id = undefined }) => ({ id }))(values);
  values.__typename = __typename;
  return {
    id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id
  };
};
operations.getAccountById.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ accountById = null }) => ({ accountById }))(values);
  values.__typename = __typename;
  return {
    accountById: ((values = {}, options = {}) => {
      const __typename = 'AccountType';
      values = (({ userName = null, hasMultipleAccounts = null, isMerchant = null, isPrivate = null, hasMerchantAccount = null, displayName = null, phone = null, city = null, kycNeeded = null, kycStatus = null, country = null, image = null, id = null, qr = null, creationMethod = null, merchantProfileDetails = null, averageRating = null, reviews = null, transactions = null }) => ({ userName, hasMultipleAccounts, isMerchant, isPrivate, hasMerchantAccount, displayName, phone, city, kycNeeded, kycStatus, country, image, id, qr, creationMethod, merchantProfileDetails, averageRating, reviews, transactions }))(values);
      values.__typename = __typename;
      return {
        userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
        hasMultipleAccounts: values.hasMultipleAccounts,
        isMerchant: values.isMerchant,
        isPrivate: values.isPrivate,
        hasMerchantAccount: values.hasMerchantAccount,
        displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
        phone: values.phone,
        city: values.city,
        kycNeeded: values.kycNeeded,
        kycStatus: !values.kycStatus ? values.kycStatus : ((values = {}, options = {}) => {
          const __typename = 'PlatformMembershipType';
          values = (({ status = null, requirements = null }) => ({ status, requirements }))(values);
          values.__typename = __typename;
          return {
            status: values.status,
            requirements: values.requirements,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.kycStatus, options),
        country: !values.country ? values.country : ((values = {}, options = {}) => {
          const __typename = 'CountryType';
          values = (({ name = null, alpha2 = null, currencyCode = null }) => ({ name, alpha2, currencyCode }))(values);
          values.__typename = __typename;
          return {
            name: values.name,
            alpha2: values.alpha2,
            currencyCode: values.currencyCode,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.country, options),
        image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        qr: !values.qr ? values.qr : ((values = {}, options = {}) => {
          const __typename = 'QRType';
          values = (({ image = null, code = null }) => ({ image, code }))(values);
          values.__typename = __typename;
          return {
            image: values.image,
            code: values.code,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.qr, options),
        creationMethod: values.creationMethod,
        merchantProfileDetails: !values.merchantProfileDetails ? values.merchantProfileDetails : ((values = {}, options = {}) => {
          const __typename = 'MerchantProfileType';
          values = (({ id = null, acceptsPayments = null, payoutsEnabled = null, capabilities = null, currency = null, geom = null, merchantType = null, address = null, country = null, status = null, businessDetails = null }) => ({ id, acceptsPayments, payoutsEnabled, capabilities, currency, geom, merchantType, address, country, status, businessDetails }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            acceptsPayments: values.acceptsPayments,
            payoutsEnabled: values.payoutsEnabled,
            capabilities: values.capabilities,
            currency: values.currency,
            geom: values.geom,
            merchantType: values.merchantType,
            address: !values.address ? values.address : ((values = {}, options = {}) => {
              const __typename = 'AddressType';
              values = (({ street = null, streetAdditional = null, city = null, region = null, postal = null }) => ({ street, streetAdditional, city, region, postal }))(values);
              values.__typename = __typename;
              return {
                street: values.street,
                streetAdditional: values.streetAdditional,
                city: values.city,
                region: values.region,
                postal: values.postal,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.address, options),
            country: !values.country ? values.country : ((values = {}, options = {}) => {
              const __typename = 'CountryType';
              values = (({ name = null, alpha2 = null }) => ({ name, alpha2 }))(values);
              values.__typename = __typename;
              return {
                name: values.name,
                alpha2: values.alpha2,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.country, options),
            status: values.status,
            businessDetails: !values.businessDetails ? values.businessDetails : ((values = {}, options = {}) => {
              const __typename = 'BusinessDetailType';
              values = (({ type = null, hasBanking = null, hasOnboarded = null, chargesEnabled = null, payoutsEnabled = null, pastDueRequirements = null, currentlyDueRequirements = null, requirementsDueDate = null }) => ({ type, hasBanking, hasOnboarded, chargesEnabled, payoutsEnabled, pastDueRequirements, currentlyDueRequirements, requirementsDueDate }))(values);
              values.__typename = __typename;
              return {
                type: values.type,
                hasBanking: values.hasBanking,
                hasOnboarded: values.hasOnboarded,
                chargesEnabled: values.chargesEnabled,
                payoutsEnabled: values.payoutsEnabled,
                pastDueRequirements: values.pastDueRequirements,
                currentlyDueRequirements: values.currentlyDueRequirements,
                requirementsDueDate: values.requirementsDueDate,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.businessDetails, options),
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.merchantProfileDetails, options),
        averageRating: values.averageRating,
        reviews: !values.reviews ? values.reviews : ((values = {}, options = {}) => {
          const __typename = 'ReviewResultsType';
          values = (({ pageInfo = null }) => ({ pageInfo }))(values);
          values.__typename = __typename;
          return {
            pageInfo: ((values = {}, options = {}) => {
              const __typename = 'PageInfo';
              values = (({ totalCount = null }) => ({ totalCount }))(values);
              values.__typename = __typename;
              return {
                totalCount: values.totalCount,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.pageInfo || undefined, options),
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.reviews, options),
        transactions: !values.transactions ? values.transactions : ((values = {}, options = {}) => {
          const __typename = 'TransactionResultsType';
          values = (({ pageInfo = null }) => ({ pageInfo }))(values);
          values.__typename = __typename;
          return {
            pageInfo: ((values = {}, options = {}) => {
              const __typename = 'PageInfo';
              values = (({ totalCount = null }) => ({ totalCount }))(values);
              values.__typename = __typename;
              return {
                totalCount: values.totalCount,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.pageInfo || undefined, options),
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.transactions, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.accountById || undefined, options)
  };
};

operations.GetAllArticles = {};
operations.GetAllArticles.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ ticker = undefined }) => ({ ticker }))(values);
  values.__typename = __typename;
  return {
    ticker: values.ticker
  };
};
operations.GetAllArticles.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ allArticles = null }) => ({ allArticles }))(values);
  values.__typename = __typename;
  return {
    allArticles: !values.allArticles ? values.allArticles : values.allArticles.map(item => ((values = {}, options = {}) => {
      const __typename = 'NewsType';
      values = (({ title = null, url = null, text = null, sourceName = null, tickers = null, topics = null, createdOn = null, imageUrl = null }) => ({ title, url, text, sourceName, tickers, topics, createdOn, imageUrl }))(values);
      values.__typename = __typename;
      return {
        title: (values.title === null || values.title === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'title', __typename, scalarValues: options.scalarValues }) : values.title,
        url: (values.url === null || values.url === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'url', __typename, scalarValues: options.scalarValues }) : values.url,
        text: (values.text === null || values.text === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'text', __typename, scalarValues: options.scalarValues }) : values.text,
        sourceName: values.sourceName,
        tickers: values.tickers || [],
        topics: values.topics || [],
        createdOn: !values.createdOn ? values.createdOn : ((values = {}, options = {}) => {
          const __typename = 'DateOfCreation';
          values = (({ date = null }) => ({ date }))(values);
          values.__typename = __typename;
          return {
            date: values.date,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.createdOn, options),
        imageUrl: (values.imageUrl === null || values.imageUrl === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'imageUrl', __typename, scalarValues: options.scalarValues }) : values.imageUrl,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.getAllPortfolio = {};
operations.getAllPortfolio.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.getAllPortfolio.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getetxPortfolio = null }) => ({ getetxPortfolio }))(values);
  values.__typename = __typename;
  return {
    getetxPortfolio: !values.getetxPortfolio ? values.getetxPortfolio : ((values = {}, options = {}) => {
      const __typename = 'EtxReBalancingPortfolio';
      values = (({ totalFiatBalance = null, fiatCurrencyCode = null, lastRebalancingOn = null, portfolio = null }) => ({ totalFiatBalance, fiatCurrencyCode, lastRebalancingOn, portfolio }))(values);
      values.__typename = __typename;
      return {
        totalFiatBalance: values.totalFiatBalance,
        fiatCurrencyCode: values.fiatCurrencyCode,
        lastRebalancingOn: values.lastRebalancingOn,
        portfolio: !values.portfolio ? values.portfolio : values.portfolio.map(item => ((values = {}, options = {}) => {
          const __typename = 'CurrencyPortFolio';
          values = (({ logoImage = null, cryptoAmount = null, currencyName = null, currency = null, fiatAmount = null, fiatCurrency = null, amountPer = null }) => ({ logoImage, cryptoAmount, currencyName, currency, fiatAmount, fiatCurrency, amountPer }))(values);
          values.__typename = __typename;
          return {
            logoImage: values.logoImage,
            cryptoAmount: values.cryptoAmount,
            currencyName: values.currencyName,
            currency: values.currency,
            fiatAmount: values.fiatAmount,
            fiatCurrency: values.fiatCurrency,
            amountPer: values.amountPer,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getetxPortfolio, options)
  };
};

operations.GetAvailablePaymentProviders = {};
operations.GetAvailablePaymentProviders.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.GetAvailablePaymentProviders.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ availableProviders = null }) => ({ availableProviders }))(values);
  values.__typename = __typename;
  return {
    availableProviders: !values.availableProviders ? values.availableProviders : values.availableProviders.map(item => ((values = {}, options = {}) => {
      const __typename = 'ProvidersType';
      values = (({ provider = null, available = null }) => ({ provider, available }))(values);
      values.__typename = __typename;
      return {
        provider: values.provider,
        available: values.available,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.GetBlocks = {};
operations.GetBlocks.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.GetBlocks.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getBlocks = null }) => ({ getBlocks }))(values);
  values.__typename = __typename;
  return {
    getBlocks: !values.getBlocks ? values.getBlocks : ((values = {}, options = {}) => {
      const __typename = 'BlocksType';
      values = (({ blocks = null }) => ({ blocks }))(values);
      values.__typename = __typename;
      return {
        blocks: !values.blocks ? values.blocks : values.blocks.map(item => ((values = {}, options = {}) => {
          const __typename = 'BlockType';
          values = (({ threeMonth = null, sixMonth = null, twelveMonth = null, name = null, link = null }) => ({ threeMonth, sixMonth, twelveMonth, name, link }))(values);
          values.__typename = __typename;
          return {
            threeMonth: values.threeMonth,
            sixMonth: values.sixMonth,
            twelveMonth: values.twelveMonth,
            name: values.name,
            link: values.link,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getBlocks, options)
  };
};

operations.GetCarouselItems = {};
operations.GetCarouselItems.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.GetCarouselItems.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getCarouselAssets = null }) => ({ getCarouselAssets }))(values);
  values.__typename = __typename;
  return {
    getCarouselAssets: !values.getCarouselAssets ? values.getCarouselAssets : values.getCarouselAssets.map(item => ((values = {}, options = {}) => {
      const __typename = 'CarouselType';
      values = (({ type = null, src = null, content = null, link = null, poster = null }) => ({ type, src, content, link, poster }))(values);
      values.__typename = __typename;
      return {
        type: (values.type === null || values.type === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'type', __typename, scalarValues: options.scalarValues }) : values.type,
        src: (values.src === null || values.src === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'src', __typename, scalarValues: options.scalarValues }) : values.src,
        content: (values.content === null || values.content === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'content', __typename, scalarValues: options.scalarValues }) : values.content,
        link: (values.link === null || values.link === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'link', __typename, scalarValues: options.scalarValues }) : values.link,
        poster: (values.poster === null || values.poster === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'poster', __typename, scalarValues: options.scalarValues }) : values.poster,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.GetCoinSwapAssets = {};
operations.GetCoinSwapAssets.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ quoteId = undefined, sourceAssetCode = undefined, destinationAssetCode = undefined }) => ({ quoteId, sourceAssetCode, destinationAssetCode }))(values);
  values.__typename = __typename;
  return {
    quoteId: values.quoteId,
    sourceAssetCode: values.sourceAssetCode,
    destinationAssetCode: values.destinationAssetCode
  };
};
operations.GetCoinSwapAssets.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ sourceAsset = null, destinationAsset = null, quote = null }) => ({ sourceAsset, destinationAsset, quote }))(values);
  values.__typename = __typename;
  return {
    sourceAsset: !values.sourceAsset ? values.sourceAsset : ((values = {}, options = {}) => {
      const __typename = 'AssetMetricType';
      values = (({ price = null }) => ({ price }))(values);
      values.__typename = __typename;
      return {
        price: values.price,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.sourceAsset, options),
    destinationAsset: !values.destinationAsset ? values.destinationAsset : ((values = {}, options = {}) => {
      const __typename = 'AssetMetricType';
      values = (({ price = null }) => ({ price }))(values);
      values.__typename = __typename;
      return {
        price: values.price,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.destinationAsset, options),
    quote: !values.quote ? values.quote : ((values = {}, options = {}) => {
      const __typename = 'QuoteType';
      values = (({ sourceCurrency = null, sourceCurrencyCode = null, sourceAmount = null, destinationCurrency = null, destinationCurrencyCode = null, destinationAmount = null, sourceFee = null, fiatCurrencyCode = null }) => ({ sourceCurrency, sourceCurrencyCode, sourceAmount, destinationCurrency, destinationCurrencyCode, destinationAmount, sourceFee, fiatCurrencyCode }))(values);
      values.__typename = __typename;
      return {
        sourceCurrency: (values.sourceCurrency === null || values.sourceCurrency === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceCurrency', __typename, scalarValues: options.scalarValues }) : values.sourceCurrency,
        sourceCurrencyCode: (values.sourceCurrencyCode === null || values.sourceCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.sourceCurrencyCode,
        sourceAmount: (values.sourceAmount === null || values.sourceAmount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceAmount', __typename, scalarValues: options.scalarValues }) : values.sourceAmount,
        destinationCurrency: values.destinationCurrency,
        destinationCurrencyCode: values.destinationCurrencyCode,
        destinationAmount: values.destinationAmount,
        sourceFee: values.sourceFee,
        fiatCurrencyCode: (values.fiatCurrencyCode === null || values.fiatCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'fiatCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.fiatCurrencyCode,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.quote, options)
  };
};

operations.GetCryptoAssetMetrics = {};
operations.GetCryptoAssetMetrics.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ assetName = undefined }) => ({ assetName }))(values);
  values.__typename = __typename;
  return {
    assetName: (values.assetName === null || values.assetName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'assetName', __typename, scalarValues: options.scalarValues }) : values.assetName
  };
};
operations.GetCryptoAssetMetrics.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getAssetMetrics = null }) => ({ getAssetMetrics }))(values);
  values.__typename = __typename;
  return {
    getAssetMetrics: !values.getAssetMetrics ? values.getAssetMetrics : ((values = {}, options = {}) => {
      const __typename = 'AssetMetricType';
      values = (({ name = null, code = null, price = null, currency = null, logoImage = null }) => ({ name, code, price, currency, logoImage }))(values);
      values.__typename = __typename;
      return {
        name: values.name,
        code: values.code,
        price: values.price,
        currency: values.currency,
        logoImage: values.logoImage,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getAssetMetrics, options)
  };
};

operations.GetCryptoBuySuccessData = {};
operations.GetCryptoBuySuccessData.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ orderId = undefined, assetCode = undefined }) => ({ orderId, assetCode }))(values);
  values.__typename = __typename;
  return {
    orderId: values.orderId,
    assetCode: values.assetCode
  };
};
operations.GetCryptoBuySuccessData.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ asset = null, order = null }) => ({ asset, order }))(values);
  values.__typename = __typename;
  return {
    asset: !values.asset ? values.asset : ((values = {}, options = {}) => {
      const __typename = 'AssetMetricType';
      values = (({ name = null, logoImage = null }) => ({ name, logoImage }))(values);
      values.__typename = __typename;
      return {
        name: values.name,
        logoImage: values.logoImage,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.asset, options),
    order: !values.order ? values.order : ((values = {}, options = {}) => {
      const __typename = 'WalletOrderType';
      values = (({ purchaseAmount = null, destinationAmount = null, sourceCurrency = null }) => ({ purchaseAmount, destinationAmount, sourceCurrency }))(values);
      values.__typename = __typename;
      return {
        purchaseAmount: values.purchaseAmount,
        destinationAmount: (values.destinationAmount === null || values.destinationAmount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'destinationAmount', __typename, scalarValues: options.scalarValues }) : values.destinationAmount,
        sourceCurrency: values.sourceCurrency,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.order, options)
  };
};

operations.GetCryptoCardOrderReservation = {};
operations.GetCryptoCardOrderReservation.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ reservationId = undefined, paymentMethodId = undefined, assetCode = undefined }) => ({ reservationId, paymentMethodId, assetCode }))(values);
  values.__typename = __typename;
  return {
    reservationId: values.reservationId,
    paymentMethodId: values.paymentMethodId,
    assetCode: values.assetCode
  };
};
operations.GetCryptoCardOrderReservation.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ asset = null, paymentMethod = null, reservation = null }) => ({ asset, paymentMethod, reservation }))(values);
  values.__typename = __typename;
  return {
    asset: !values.asset ? values.asset : ((values = {}, options = {}) => {
      const __typename = 'AssetMetricType';
      values = (({ price = null }) => ({ price }))(values);
      values.__typename = __typename;
      return {
        price: values.price,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.asset, options),
    paymentMethod: ((values = {}, options = {}) => {
      const __typename = 'PaymentMethodType';
      values = (({ id = null, lastFour = null, cardBrand = null }) => ({ id, lastFour, cardBrand }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        lastFour: values.lastFour,
        cardBrand: !values.cardBrand ? values.cardBrand : ((values = {}, options = {}) => {
          const __typename = 'CardBrand';
          values = (({ id = null, display = null, image = null }) => ({ id, display, image }))(values);
          values.__typename = __typename;
          return {
            id: values.id,
            display: values.display,
            image: values.image,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.cardBrand, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.paymentMethod || undefined, options),
    reservation: !values.reservation ? values.reservation : ((values = {}, options = {}) => {
      const __typename = 'ReservationType';
      values = (({ reservationId = null, exchangeRate = null, sourceAmount = null, sourceCurrency = null, destinationCurrency = null, destinationAmount = null, fees = null }) => ({ reservationId, exchangeRate, sourceAmount, sourceCurrency, destinationCurrency, destinationAmount, fees }))(values);
      values.__typename = __typename;
      return {
        reservationId: values.reservationId,
        exchangeRate: values.exchangeRate,
        sourceAmount: values.sourceAmount,
        sourceCurrency: values.sourceCurrency,
        destinationCurrency: values.destinationCurrency,
        destinationAmount: values.destinationAmount,
        fees: !values.fees ? values.fees : values.fees.map(item => ((values = {}, options = {}) => {
          const __typename = 'QuoteFees';
          values = (({ currencyName = null, feeAmount = null }) => ({ currencyName, feeAmount }))(values);
          values.__typename = __typename;
          return {
            currencyName: values.currencyName,
            feeAmount: values.feeAmount,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.reservation, options)
  };
};

operations.GetCryptoMarketList = {};
operations.GetCryptoMarketList.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ interestOnly = undefined, type = undefined }) => ({ interestOnly, type }))(values);
  values.__typename = __typename;
  return {
    interestOnly: values.interestOnly,
    type: values.type
  };
};
operations.GetCryptoMarketList.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getMarketList = null }) => ({ getMarketList }))(values);
  values.__typename = __typename;
  return {
    getMarketList: !values.getMarketList ? values.getMarketList : ((values = {}, options = {}) => {
      const __typename = 'AssetMarketMetricList';
      values = (({ assets = null }) => ({ assets }))(values);
      values.__typename = __typename;
      return {
        assets: !values.assets ? values.assets : values.assets.map(item => ((values = {}, options = {}) => {
          const __typename = 'AssetMetricType';
          values = (({ name = null, code = null, price = null, currency = null, logoImage = null, percentChangeOverPeriod = null }) => ({ name, code, price, currency, logoImage, percentChangeOverPeriod }))(values);
          values.__typename = __typename;
          return {
            name: values.name,
            code: values.code,
            price: values.price,
            currency: values.currency,
            logoImage: values.logoImage,
            percentChangeOverPeriod: values.percentChangeOverPeriod,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getMarketList, options)
  };
};

operations.GetCryptoPurchaseMethods = {};
operations.GetCryptoPurchaseMethods.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ purchaseAmount = undefined, purchaseCurrency = undefined }) => ({ purchaseAmount, purchaseCurrency }))(values);
  values.__typename = __typename;
  return {
    purchaseAmount: values.purchaseAmount,
    purchaseCurrency: values.purchaseCurrency
  };
};
operations.GetCryptoPurchaseMethods.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ assets = null, cards = null, banks = null }) => ({ assets, cards, banks }))(values);
  values.__typename = __typename;
  return {
    assets: !values.assets ? values.assets : values.assets.map(item => ((values = {}, options = {}) => {
      const __typename = 'AssetBalanceType';
      values = (({ name = null, code = null, logoImage = null, amount = null, fiatAmount = null }) => ({ name, code, logoImage, amount, fiatAmount }))(values);
      values.__typename = __typename;
      return {
        name: values.name,
        code: values.code,
        logoImage: values.logoImage,
        amount: values.amount,
        fiatAmount: !values.fiatAmount ? values.fiatAmount : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ value = null, major = null, display = null }) => ({ value, major, display }))(values);
          values.__typename = __typename;
          return {
            value: values.value,
            major: values.major,
            display: values.display,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.fiatAmount, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options)),
    cards: (values.cards || []).map(item => ((values = {}, options = {}) => {
      const __typename = 'PaymentMethodType';
      values = (({ id = null, name = null, lastFour = null, region = null, type = null, expirationDate = null, cardBrand = null }) => ({ id, name, lastFour, region, type, expirationDate, cardBrand }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        name: values.name,
        lastFour: values.lastFour,
        region: values.region,
        type: (values.type === null || values.type === undefined) ? "ACH" : values.type,
        expirationDate: values.expirationDate,
        cardBrand: !values.cardBrand ? values.cardBrand : ((values = {}, options = {}) => {
          const __typename = 'CardBrand';
          values = (({ id = null, image = null, display = null }) => ({ id, image, display }))(values);
          values.__typename = __typename;
          return {
            id: values.id,
            image: values.image,
            display: values.display,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.cardBrand, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options)),
    banks: (values.banks || []).map(item => ((values = {}, options = {}) => {
      const __typename = 'PaymentMethodType';
      values = (({ id = null, name = null, type = null, lastFour = null, region = null, status = null, cardBrand = null }) => ({ id, name, type, lastFour, region, status, cardBrand }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        name: values.name,
        type: (values.type === null || values.type === undefined) ? "ACH" : values.type,
        lastFour: values.lastFour,
        region: values.region,
        status: values.status,
        cardBrand: !values.cardBrand ? values.cardBrand : ((values = {}, options = {}) => {
          const __typename = 'CardBrand';
          values = (({ id = null, image = null, display = null }) => ({ id, image, display }))(values);
          values.__typename = __typename;
          return {
            id: values.id,
            image: values.image,
            display: values.display,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.cardBrand, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.GetRecentCryptoTransactions = {};
operations.GetRecentCryptoTransactions.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ seeAll = undefined, transactionCategory = undefined, asset = undefined }) => ({ seeAll, transactionCategory, asset }))(values);
  values.__typename = __typename;
  return {
    seeAll: values.seeAll,
    transactionCategory: values.transactionCategory,
    asset: values.asset
  };
};
operations.GetRecentCryptoTransactions.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getRecentTransactions = null }) => ({ getRecentTransactions }))(values);
  values.__typename = __typename;
  return {
    getRecentTransactions: !values.getRecentTransactions ? values.getRecentTransactions : values.getRecentTransactions.map(item => ((values = {}, options = {}) => {
      const __typename = 'AssetTransactionType';
      values = (({ asset = null, amount = null, date = null, coin = null, category = null, fiatCurrency = null, status = null, fiatAmount = null, assetName = null, swappedAsset = null, swappedAssetName = null, receiver = null, sender = null }) => ({ asset, amount, date, coin, category, fiatCurrency, status, fiatAmount, assetName, swappedAsset, swappedAssetName, receiver, sender }))(values);
      values.__typename = __typename;
      return {
        asset: values.asset,
        amount: values.amount,
        date: values.date,
        coin: !values.coin ? values.coin : ((values = {}, options = {}) => {
          const __typename = 'AssetType';
          values = (({ name = null, logoImage = null, code = null }) => ({ name, logoImage, code }))(values);
          values.__typename = __typename;
          return {
            name: values.name,
            logoImage: values.logoImage,
            code: values.code,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.coin, options),
        category: values.category,
        fiatCurrency: values.fiatCurrency,
        status: values.status,
        fiatAmount: !values.fiatAmount ? values.fiatAmount : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ display = null, major = null }) => ({ display, major }))(values);
          values.__typename = __typename;
          return {
            display: values.display,
            major: values.major,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.fiatAmount, options),
        assetName: values.assetName,
        swappedAsset: values.swappedAsset,
        swappedAssetName: values.swappedAssetName,
        receiver: !values.receiver ? values.receiver : ((values = {}, options = {}) => {
          const __typename = 'AccountType';
          values = (({ id = null, userName = null, displayName = null, image = null }) => ({ id, userName, displayName, image }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
            displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
            image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.receiver, options),
        sender: !values.sender ? values.sender : ((values = {}, options = {}) => {
          const __typename = 'AccountType';
          values = (({ id = null, userName = null, displayName = null, image = null }) => ({ id, userName, displayName, image }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
            displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
            image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.sender, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.GetEtxHistory = {};
operations.GetEtxHistory.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.GetEtxHistory.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getEtxHistory = null }) => ({ getEtxHistory }))(values);
  values.__typename = __typename;
  return {
    getEtxHistory: !values.getEtxHistory ? values.getEtxHistory : ((values = {}, options = {}) => {
      const __typename = 'EtxType';
      values = (({ Month = null, sixMonth = null, twelveMonth = null }) => ({ Month, sixMonth, twelveMonth }))(values);
      values.__typename = __typename;
      return {
        Month: values.Month,
        sixMonth: values.sixMonth,
        twelveMonth: values.twelveMonth,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getEtxHistory, options)
  };
};

operations.getEtxProduct = {};
operations.getEtxProduct.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.getEtxProduct.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getEtxProduct = null }) => ({ getEtxProduct }))(values);
  values.__typename = __typename;
  return {
    getEtxProduct: !values.getEtxProduct ? values.getEtxProduct : ((values = {}, options = {}) => {
      const __typename = 'EtxProductList';
      values = (({ name = null, etxKey = null, logoImage = null, distribution = null }) => ({ name, etxKey, logoImage, distribution }))(values);
      values.__typename = __typename;
      return {
        name: values.name,
        etxKey: values.etxKey,
        logoImage: values.logoImage,
        distribution: !values.distribution ? values.distribution : values.distribution.map(item => ((values = {}, options = {}) => {
          const __typename = 'DistributionCurrency';
          values = (({ name = null, code = null, image = null, percentage = null }) => ({ name, code, image, percentage }))(values);
          values.__typename = __typename;
          return {
            name: values.name,
            code: values.code,
            image: values.image,
            percentage: values.percentage,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getEtxProduct, options)
  };
};

operations.getEvent = {};
operations.getEvent.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ merchantId = undefined, platformEventId = undefined, venuePlatformId = undefined }) => ({ merchantId, platformEventId, venuePlatformId }))(values);
  values.__typename = __typename;
  return {
    merchantId: values.merchantId,
    platformEventId: values.platformEventId,
    venuePlatformId: values.venuePlatformId
  };
};
operations.getEvent.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getEvent = null }) => ({ getEvent }))(values);
  values.__typename = __typename;
  return {
    getEvent: !values.getEvent ? values.getEvent : ((values = {}, options = {}) => {
      const __typename = 'EventDetailType';
      values = (({ eventInfo = null, ticketDetails = null }) => ({ eventInfo, ticketDetails }))(values);
      values.__typename = __typename;
      return {
        eventInfo: ((values = {}, options = {}) => {
          const __typename = 'EventType';
          values = (({ id = null, title = null, dateTime = null, description = null, artists = null, type = null, isOnline = null, imageUrl = null }) => ({ id, title, dateTime, description, artists, type, isOnline, imageUrl }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            title: (values.title === null || values.title === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'title', __typename, scalarValues: options.scalarValues }) : values.title,
            dateTime: (values.dateTime === null || values.dateTime === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'DateTime', mappedTypeName: 'any', fieldName: 'dateTime', __typename, scalarValues: options.scalarValues }) : values.dateTime,
            description: (values.description === null || values.description === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'description', __typename, scalarValues: options.scalarValues }) : values.description,
            artists: values.artists,
            type: values.type,
            isOnline: values.isOnline,
            imageUrl: values.imageUrl,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.eventInfo || undefined, options),
        ticketDetails: (values.ticketDetails || []).map(item => ((values = {}, options = {}) => {
          const __typename = 'TicketDetailsType';
          values = (({ id = null, type = null, currency = null, price = null, status = null, minimumPerOrder = null, maximumPerOrder = null, saleStart = null, saleEnd = null }) => ({ id, type, currency, price, status, minimumPerOrder, maximumPerOrder, saleStart, saleEnd }))(values);
          values.__typename = __typename;
          return {
            id: values.id,
            type: values.type,
            currency: values.currency,
            price: !values.price ? values.price : ((values = {}, options = {}) => {
              const __typename = 'ValueDisplay';
              values = (({ value = null, display = null, major = null }) => ({ value, display, major }))(values);
              values.__typename = __typename;
              return {
                value: values.value,
                display: values.display,
                major: values.major,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.price, options),
            status: values.status,
            minimumPerOrder: values.minimumPerOrder,
            maximumPerOrder: values.maximumPerOrder,
            saleStart: values.saleStart,
            saleEnd: values.saleEnd,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getEvent, options)
  };
};

operations.getFeatures = {};
operations.getFeatures.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.getFeatures.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ features = null }) => ({ features }))(values);
  values.__typename = __typename;
  return {
    features: !values.features ? values.features : ((values = {}, options = {}) => {
      const __typename = 'FeaturesType';
      values = (({ features = null }) => ({ features }))(values);
      values.__typename = __typename;
      return {
        features: !values.features ? values.features : values.features.map(item => ((values = {}, options = {}) => {
          const __typename = 'FeatureType';
          values = (({ id = null, name = null, description = null, enabled = null }) => ({ id, name, description, enabled }))(values);
          values.__typename = __typename;
          return {
            id: values.id,
            name: values.name,
            description: values.description,
            enabled: values.enabled,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.features, options)
  };
};

operations.GetMatchingEngineCreditCards = {};
operations.GetMatchingEngineCreditCards.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.GetMatchingEngineCreditCards.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ matchingEngineCards = null }) => ({ matchingEngineCards }))(values);
  values.__typename = __typename;
  return {
    matchingEngineCards: !values.matchingEngineCards ? values.matchingEngineCards : values.matchingEngineCards.map(item => ((values = {}, options = {}) => {
      const __typename = 'MatchingEngineType';
      values = (({ name = null, image = null, link = null }) => ({ name, image, link }))(values);
      values.__typename = __typename;
      return {
        name: (values.name === null || values.name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'name', __typename, scalarValues: options.scalarValues }) : values.name,
        image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
        link: (values.link === null || values.link === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'link', __typename, scalarValues: options.scalarValues }) : values.link,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.GetMatchingEngineLenders = {};
operations.GetMatchingEngineLenders.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.GetMatchingEngineLenders.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ matchingEngineLenders = null }) => ({ matchingEngineLenders }))(values);
  values.__typename = __typename;
  return {
    matchingEngineLenders: !values.matchingEngineLenders ? values.matchingEngineLenders : values.matchingEngineLenders.map(item => ((values = {}, options = {}) => {
      const __typename = 'MatchingEngineType';
      values = (({ name = null, image = null, link = null }) => ({ name, image, link }))(values);
      values.__typename = __typename;
      return {
        name: (values.name === null || values.name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'name', __typename, scalarValues: options.scalarValues }) : values.name,
        image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
        link: (values.link === null || values.link === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'link', __typename, scalarValues: options.scalarValues }) : values.link,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.GetMissingStripeRequirements = {};
operations.GetMissingStripeRequirements.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.GetMissingStripeRequirements.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ me = null, missingStripeRequirements = null }) => ({ me, missingStripeRequirements }))(values);
  values.__typename = __typename;
  return {
    me: ((values = {}, options = {}) => {
      const __typename = 'AccountType';
      values = (({ merchantProfileDetails = null }) => ({ merchantProfileDetails }))(values);
      values.__typename = __typename;
      return {
        merchantProfileDetails: !values.merchantProfileDetails ? values.merchantProfileDetails : ((values = {}, options = {}) => {
          const __typename = 'MerchantProfileType';
          values = (({ countryCode = null }) => ({ countryCode }))(values);
          values.__typename = __typename;
          return {
            countryCode: values.countryCode,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.merchantProfileDetails, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.me || undefined, options),
    missingStripeRequirements: !values.missingStripeRequirements ? values.missingStripeRequirements : ((values = {}, options = {}) => {
      const __typename = 'MissingStripeRequirementsType';
      values = (({ persons = null, business = null }) => ({ persons, business }))(values);
      values.__typename = __typename;
      return {
        persons: !values.persons ? values.persons : values.persons.map(item => ((values = {}, options = {}) => {
          const __typename = 'MissingStripePersonFieldsType';
          values = (({ id = null, name = null, relationships = null, missingFields = null }) => ({ id, name, relationships, missingFields }))(values);
          values.__typename = __typename;
          return {
            id: values.id,
            name: values.name,
            relationships: values.relationships,
            missingFields: !values.missingFields ? values.missingFields : values.missingFields.map(item => ((values = {}, options = {}) => {
              const __typename = 'MissingStripeField';
              values = (({ fieldName = null, properties = null }) => ({ fieldName, properties }))(values);
              values.__typename = __typename;
              return {
                fieldName: values.fieldName,
                properties: values.properties,
                ...(options.addTypename ? { __typename } : {})
              };
            })(item, options)),
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        business: !values.business ? values.business : ((values = {}, options = {}) => {
          const __typename = 'MissingStripeBusinessFieldsType';
          values = (({ id = null, name = null, type = null, missingFields = null }) => ({ id, name, type, missingFields }))(values);
          values.__typename = __typename;
          return {
            id: values.id,
            name: values.name,
            type: values.type,
            missingFields: !values.missingFields ? values.missingFields : values.missingFields.map(item => ((values = {}, options = {}) => {
              const __typename = 'MissingStripeField';
              values = (({ fieldName = null, properties = null }) => ({ fieldName, properties }))(values);
              values.__typename = __typename;
              return {
                fieldName: values.fieldName,
                properties: values.properties,
                ...(options.addTypename ? { __typename } : {})
              };
            })(item, options)),
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.business, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.missingStripeRequirements, options)
  };
};

operations.GetMyAssetAddress = {};
operations.GetMyAssetAddress.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ asset = undefined }) => ({ asset }))(values);
  values.__typename = __typename;
  return {
    asset: values.asset
  };
};
operations.GetMyAssetAddress.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ myAssetAddress = null }) => ({ myAssetAddress }))(values);
  values.__typename = __typename;
  return {
    myAssetAddress: !values.myAssetAddress ? values.myAssetAddress : ((values = {}, options = {}) => {
      const __typename = 'CryptoAddressQRType';
      values = (({ code = null, image = null }) => ({ code, image }))(values);
      values.__typename = __typename;
      return {
        code: values.code,
        image: values.image,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.myAssetAddress, options)
  };
};

operations.getMyAssetInterestRates = {};
operations.getMyAssetInterestRates.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.getMyAssetInterestRates.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ myAssetInterestRates = null }) => ({ myAssetInterestRates }))(values);
  values.__typename = __typename;
  return {
    myAssetInterestRates: !values.myAssetInterestRates ? values.myAssetInterestRates : values.myAssetInterestRates.map(item => ((values = {}, options = {}) => {
      const __typename = 'AssetInterestRateType';
      values = (({ code = null, name = null, logoImage = null, interestRate = null }) => ({ code, name, logoImage, interestRate }))(values);
      values.__typename = __typename;
      return {
        code: values.code,
        name: values.name,
        logoImage: values.logoImage,
        interestRate: values.interestRate,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.MyAssets = {};
operations.MyAssets.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ currency = undefined, type = undefined }) => ({ currency, type }))(values);
  values.__typename = __typename;
  return {
    currency: (values.currency === null || values.currency === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'currency', __typename, scalarValues: options.scalarValues }) : values.currency,
    type: values.type
  };
};
operations.MyAssets.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ myAssets = null }) => ({ myAssets }))(values);
  values.__typename = __typename;
  return {
    myAssets: !values.myAssets ? values.myAssets : values.myAssets.map(item => ((values = {}, options = {}) => {
      const __typename = 'AssetBalanceType';
      values = (({ name = null, code = null, logoImage = null, amount = null, interestGaining = null, exchangeRate = null, fiatAmount = null }) => ({ name, code, logoImage, amount, interestGaining, exchangeRate, fiatAmount }))(values);
      values.__typename = __typename;
      return {
        name: values.name,
        code: values.code,
        logoImage: values.logoImage,
        amount: values.amount,
        interestGaining: values.interestGaining,
        exchangeRate: values.exchangeRate,
        fiatAmount: !values.fiatAmount ? values.fiatAmount : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ value = null, display = null, major = null }) => ({ value, display, major }))(values);
          values.__typename = __typename;
          return {
            value: values.value,
            display: values.display,
            major: values.major,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.fiatAmount, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.GetMyAssetsAndMetrics = {};
operations.GetMyAssetsAndMetrics.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ assetName = undefined, currency = undefined }) => ({ assetName, currency }))(values);
  values.__typename = __typename;
  return {
    assetName: (values.assetName === null || values.assetName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'assetName', __typename, scalarValues: options.scalarValues }) : values.assetName,
    currency: (values.currency === null || values.currency === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'currency', __typename, scalarValues: options.scalarValues }) : values.currency
  };
};
operations.GetMyAssetsAndMetrics.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ myAssets = null, getAssetMetrics = null }) => ({ myAssets, getAssetMetrics }))(values);
  values.__typename = __typename;
  return {
    myAssets: !values.myAssets ? values.myAssets : values.myAssets.map(item => ((values = {}, options = {}) => {
      const __typename = 'AssetBalanceType';
      values = (({ code = null, amount = null, fiatAmount = null }) => ({ code, amount, fiatAmount }))(values);
      values.__typename = __typename;
      return {
        code: values.code,
        amount: values.amount,
        fiatAmount: !values.fiatAmount ? values.fiatAmount : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ value = null, major = null, display = null }) => ({ value, major, display }))(values);
          values.__typename = __typename;
          return {
            value: values.value,
            major: values.major,
            display: values.display,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.fiatAmount, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options)),
    getAssetMetrics: !values.getAssetMetrics ? values.getAssetMetrics : ((values = {}, options = {}) => {
      const __typename = 'AssetMetricType';
      values = (({ name = null, code = null, price = null, currency = null, logoImage = null }) => ({ name, code, price, currency, logoImage }))(values);
      values.__typename = __typename;
      return {
        name: values.name,
        code: values.code,
        price: values.price,
        currency: values.currency,
        logoImage: values.logoImage,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getAssetMetrics, options)
  };
};

operations.getMyAssetsInterestSummary = {};
operations.getMyAssetsInterestSummary.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.getMyAssetsInterestSummary.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ myAssetsInterestSummary = null }) => ({ myAssetsInterestSummary }))(values);
  values.__typename = __typename;
  return {
    myAssetsInterestSummary: !values.myAssetsInterestSummary ? values.myAssetsInterestSummary : ((values = {}, options = {}) => {
      const __typename = 'AssetInterestSummaryType';
      values = (({ totalInterestGained = null, totalInterestGainedFiat = null, assets = null }) => ({ totalInterestGained, totalInterestGainedFiat, assets }))(values);
      values.__typename = __typename;
      return {
        totalInterestGained: values.totalInterestGained,
        totalInterestGainedFiat: !values.totalInterestGainedFiat ? values.totalInterestGainedFiat : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ major = null }) => ({ major }))(values);
          values.__typename = __typename;
          return {
            major: values.major,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.totalInterestGainedFiat, options),
        assets: !values.assets ? values.assets : values.assets.map(item => ((values = {}, options = {}) => {
          const __typename = 'AssetInterestGainedType';
          values = (({ name = null, code = null, logoImage = null, interestGained = null, interestGainedFiat = null }) => ({ name, code, logoImage, interestGained, interestGainedFiat }))(values);
          values.__typename = __typename;
          return {
            name: values.name,
            code: values.code,
            logoImage: values.logoImage,
            interestGained: values.interestGained,
            interestGainedFiat: !values.interestGainedFiat ? values.interestGainedFiat : ((values = {}, options = {}) => {
              const __typename = 'ValueDisplay';
              values = (({ major = null }) => ({ major }))(values);
              values.__typename = __typename;
              return {
                major: values.major,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.interestGainedFiat, options),
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.myAssetsInterestSummary, options)
  };
};

operations.GetMyMerchantBusinessDetails = {};
operations.GetMyMerchantBusinessDetails.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.GetMyMerchantBusinessDetails.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ myMerchantProfile = null }) => ({ myMerchantProfile }))(values);
  values.__typename = __typename;
  return {
    myMerchantProfile: !values.myMerchantProfile ? values.myMerchantProfile : ((values = {}, options = {}) => {
      const __typename = 'MerchantProfileType';
      values = (({ acceptsPayments = null, id = null, businessDetails = null }) => ({ acceptsPayments, id, businessDetails }))(values);
      values.__typename = __typename;
      return {
        acceptsPayments: values.acceptsPayments,
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        businessDetails: !values.businessDetails ? values.businessDetails : ((values = {}, options = {}) => {
          const __typename = 'BusinessDetailType';
          values = (({ type = null, hasBanking = null, hasOnboarded = null }) => ({ type, hasBanking, hasOnboarded }))(values);
          values.__typename = __typename;
          return {
            type: values.type,
            hasBanking: values.hasBanking,
            hasOnboarded: values.hasOnboarded,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.businessDetails, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.myMerchantProfile, options)
  };
};

operations.GetMyPaymentMethods = {};
operations.GetMyPaymentMethods.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ paymentMethodCategory = undefined }) => ({ paymentMethodCategory }))(values);
  values.__typename = __typename;
  return {
    paymentMethodCategory: values.paymentMethodCategory
  };
};
operations.GetMyPaymentMethods.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ paymentMethods = null }) => ({ paymentMethods }))(values);
  values.__typename = __typename;
  return {
    paymentMethods: (values.paymentMethods || []).map(item => ((values = {}, options = {}) => {
      const __typename = 'PaymentMethodType';
      values = (({ id = null, name = null, lastFour = null, expirationDate = null, status = null, type = null, cardBrand = null }) => ({ id, name, lastFour, expirationDate, status, type, cardBrand }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        name: values.name,
        lastFour: values.lastFour,
        expirationDate: values.expirationDate,
        status: values.status,
        type: (values.type === null || values.type === undefined) ? "ACH" : values.type,
        cardBrand: !values.cardBrand ? values.cardBrand : ((values = {}, options = {}) => {
          const __typename = 'CardBrand';
          values = (({ display = null, image = null }) => ({ display, image }))(values);
          values.__typename = __typename;
          return {
            display: values.display,
            image: values.image,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.cardBrand, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.getPayoutSummary = {};
operations.getPayoutSummary.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.getPayoutSummary.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getPayoutSummary = null }) => ({ getPayoutSummary }))(values);
  values.__typename = __typename;
  return {
    getPayoutSummary: !values.getPayoutSummary ? values.getPayoutSummary : ((values = {}, options = {}) => {
      const __typename = 'PayoutSummaryType';
      values = (({ currency = null, currentBalance = null, pendingBalance = null, payoutHistory = null, available = null, pending = null }) => ({ currency, currentBalance, pendingBalance, payoutHistory, available, pending }))(values);
      values.__typename = __typename;
      return {
        currency: values.currency,
        currentBalance: values.currentBalance,
        pendingBalance: values.pendingBalance,
        payoutHistory: !values.payoutHistory ? values.payoutHistory : values.payoutHistory.map(item => ((values = {}, options = {}) => {
          const __typename = 'PayoutItemType';
          values = (({ date = null, status = null, amount = null }) => ({ date, status, amount }))(values);
          values.__typename = __typename;
          return {
            date: values.date,
            status: values.status,
            amount: !values.amount ? values.amount : ((values = {}, options = {}) => {
              const __typename = 'ValueDisplay';
              values = (({ value = null, display = null, major = null }) => ({ value, display, major }))(values);
              values.__typename = __typename;
              return {
                value: values.value,
                display: values.display,
                major: values.major,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.amount, options),
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        available: !values.available ? values.available : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ value = null, display = null, major = null }) => ({ value, display, major }))(values);
          values.__typename = __typename;
          return {
            value: values.value,
            display: values.display,
            major: values.major,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.available, options),
        pending: !values.pending ? values.pending : ((values = {}, options = {}) => {
          const __typename = 'ValueDisplay';
          values = (({ value = null, display = null, major = null }) => ({ value, display, major }))(values);
          values.__typename = __typename;
          return {
            value: values.value,
            display: values.display,
            major: values.major,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.pending, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getPayoutSummary, options)
  };
};

operations.GetQuoteAndAsset = {};
operations.GetQuoteAndAsset.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ quoteId = undefined, assetCode = undefined }) => ({ quoteId, assetCode }))(values);
  values.__typename = __typename;
  return {
    quoteId: values.quoteId,
    assetCode: values.assetCode
  };
};
operations.GetQuoteAndAsset.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ asset = null, quote = null }) => ({ asset, quote }))(values);
  values.__typename = __typename;
  return {
    asset: !values.asset ? values.asset : ((values = {}, options = {}) => {
      const __typename = 'AssetMetricType';
      values = (({ price = null, logoImage = null }) => ({ price, logoImage }))(values);
      values.__typename = __typename;
      return {
        price: values.price,
        logoImage: values.logoImage,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.asset, options),
    quote: !values.quote ? values.quote : ((values = {}, options = {}) => {
      const __typename = 'QuoteType';
      values = (({ sourceCurrency = null, sourceCurrencyCode = null, sourceAmount = null, destinationCurrency = null, destinationCurrencyCode = null, destinationAmount = null, sourceFee = null, fiatCurrencyCode = null }) => ({ sourceCurrency, sourceCurrencyCode, sourceAmount, destinationCurrency, destinationCurrencyCode, destinationAmount, sourceFee, fiatCurrencyCode }))(values);
      values.__typename = __typename;
      return {
        sourceCurrency: (values.sourceCurrency === null || values.sourceCurrency === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceCurrency', __typename, scalarValues: options.scalarValues }) : values.sourceCurrency,
        sourceCurrencyCode: (values.sourceCurrencyCode === null || values.sourceCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.sourceCurrencyCode,
        sourceAmount: (values.sourceAmount === null || values.sourceAmount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceAmount', __typename, scalarValues: options.scalarValues }) : values.sourceAmount,
        destinationCurrency: values.destinationCurrency,
        destinationCurrencyCode: values.destinationCurrencyCode,
        destinationAmount: values.destinationAmount,
        sourceFee: values.sourceFee,
        fiatCurrencyCode: (values.fiatCurrencyCode === null || values.fiatCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'fiatCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.fiatCurrencyCode,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.quote, options)
  };
};

operations.GetQuoteById = {};
operations.GetQuoteById.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ quoteId = undefined, assetCode = undefined }) => ({ quoteId, assetCode }))(values);
  values.__typename = __typename;
  return {
    quoteId: values.quoteId,
    assetCode: values.assetCode
  };
};
operations.GetQuoteById.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getQuote = null }) => ({ getQuote }))(values);
  values.__typename = __typename;
  return {
    getQuote: !values.getQuote ? values.getQuote : ((values = {}, options = {}) => {
      const __typename = 'QuoteType';
      values = (({ paymentName = null, sourceCurrency = null, sourceCurrencyCode = null, sourceAmount = null, destinationCurrency = null, destinationCurrencyCode = null, destinationAmount = null, sourceFee = null, notes = null, fiatFees = null, fiatAmount = null, fiatCurrencyCode = null, destination = null, isInternal = null }) => ({ paymentName, sourceCurrency, sourceCurrencyCode, sourceAmount, destinationCurrency, destinationCurrencyCode, destinationAmount, sourceFee, notes, fiatFees, fiatAmount, fiatCurrencyCode, destination, isInternal }))(values);
      values.__typename = __typename;
      return {
        paymentName: values.paymentName,
        sourceCurrency: (values.sourceCurrency === null || values.sourceCurrency === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceCurrency', __typename, scalarValues: options.scalarValues }) : values.sourceCurrency,
        sourceCurrencyCode: (values.sourceCurrencyCode === null || values.sourceCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.sourceCurrencyCode,
        sourceAmount: (values.sourceAmount === null || values.sourceAmount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'sourceAmount', __typename, scalarValues: options.scalarValues }) : values.sourceAmount,
        destinationCurrency: values.destinationCurrency,
        destinationCurrencyCode: values.destinationCurrencyCode,
        destinationAmount: values.destinationAmount,
        sourceFee: values.sourceFee,
        notes: values.notes,
        fiatFees: values.fiatFees,
        fiatAmount: (values.fiatAmount === null || values.fiatAmount === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Float', mappedTypeName: 'number', fieldName: 'fiatAmount', __typename, scalarValues: options.scalarValues }) : values.fiatAmount,
        fiatCurrencyCode: (values.fiatCurrencyCode === null || values.fiatCurrencyCode === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'fiatCurrencyCode', __typename, scalarValues: options.scalarValues }) : values.fiatCurrencyCode,
        destination: (values.destination === null || values.destination === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'destination', __typename, scalarValues: options.scalarValues }) : values.destination,
        isInternal: values.isInternal,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getQuote, options)
  };
};

operations.GetRecentlyTransactedWith = {};
operations.GetRecentlyTransactedWith.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.GetRecentlyTransactedWith.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ me = null }) => ({ me }))(values);
  values.__typename = __typename;
  return {
    me: ((values = {}, options = {}) => {
      const __typename = 'AccountType';
      values = (({ recentlyTransactedWith = null }) => ({ recentlyTransactedWith }))(values);
      values.__typename = __typename;
      return {
        recentlyTransactedWith: !values.recentlyTransactedWith ? values.recentlyTransactedWith : values.recentlyTransactedWith.map(item => ((values = {}, options = {}) => {
          const __typename = 'AccountType';
          values = (({ id = null, image = null, userName = null, displayName = null }) => ({ id, image, userName, displayName }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
            userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
            displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.me || undefined, options)
  };
};

operations.getReviewsByAccountId = {};
operations.getReviewsByAccountId.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ merchantId = undefined, page = undefined, limit = undefined }) => ({ merchantId, page, limit }))(values);
  values.__typename = __typename;
  return {
    merchantId: (values.merchantId === null || values.merchantId === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'merchantId', __typename, scalarValues: options.scalarValues }) : values.merchantId,
    page: values.page,
    limit: values.limit
  };
};
operations.getReviewsByAccountId.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ reviews = null }) => ({ reviews }))(values);
  values.__typename = __typename;
  return {
    reviews: ((values = {}, options = {}) => {
      const __typename = 'ReviewResultsType';
      values = (({ nodes = null, pageInfo = null }) => ({ nodes, pageInfo }))(values);
      values.__typename = __typename;
      return {
        nodes: !values.nodes ? values.nodes : values.nodes.map(item => ((values = {}, options = {}) => {
          const __typename = 'ReviewType';
          values = (({ transaction = null, id = null, date = null, detail = null, averageRating = null, rating = null }) => ({ transaction, id, date, detail, averageRating, rating }))(values);
          values.__typename = __typename;
          return {
            transaction: !values.transaction ? values.transaction : ((values = {}, options = {}) => {
              const __typename = 'TransactionType';
              values = (({ sender = null }) => ({ sender }))(values);
              values.__typename = __typename;
              return {
                sender: !values.sender ? values.sender : ((values = {}, options = {}) => {
                  const __typename = 'AccountType';
                  values = (({ displayName = null, userName = null, image = null }) => ({ displayName, userName, image }))(values);
                  values.__typename = __typename;
                  return {
                    displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
                    userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
                    image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
                    ...(options.addTypename ? { __typename } : {})
                  };
                })(values.sender, options),
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.transaction, options),
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            date: values.date,
            detail: values.detail,
            averageRating: values.averageRating,
            rating: values.rating,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        pageInfo: ((values = {}, options = {}) => {
          const __typename = 'PageInfo';
          values = (({ currentPage = null, totalCount = null, perPage = null }) => ({ currentPage, totalCount, perPage }))(values);
          values.__typename = __typename;
          return {
            currentPage: values.currentPage,
            totalCount: values.totalCount,
            perPage: values.perPage,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.pageInfo || undefined, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.reviews || undefined, options)
  };
};

operations.GetVenueById = {};
operations.GetVenueById.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ id = undefined }) => ({ id }))(values);
  values.__typename = __typename;
  return {
    id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id
  };
};
operations.GetVenueById.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getVenueById = null }) => ({ getVenueById }))(values);
  values.__typename = __typename;
  return {
    getVenueById: !values.getVenueById ? values.getVenueById : ((values = {}, options = {}) => {
      const __typename = 'VenueType';
      values = (({ merchant = null, platformId = null, venueEvents = null }) => ({ merchant, platformId, venueEvents }))(values);
      values.__typename = __typename;
      return {
        merchant: !values.merchant ? values.merchant : ((values = {}, options = {}) => {
          const __typename = 'MerchantProfileType';
          values = (({ id = null, displayName = null, address = null }) => ({ id, displayName, address }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            displayName: values.displayName,
            address: !values.address ? values.address : ((values = {}, options = {}) => {
              const __typename = 'AddressType';
              values = (({ street = null, streetAdditional = null, city = null, region = null, postal = null }) => ({ street, streetAdditional, city, region, postal }))(values);
              values.__typename = __typename;
              return {
                street: values.street,
                streetAdditional: values.streetAdditional,
                city: values.city,
                region: values.region,
                postal: values.postal,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.address, options),
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.merchant, options),
        platformId: values.platformId,
        venueEvents: !values.venueEvents ? values.venueEvents : ((values = {}, options = {}) => {
          const __typename = 'VenueEventsType';
          values = (({ events = null }) => ({ events }))(values);
          values.__typename = __typename;
          return {
            events: !values.events ? values.events : values.events.map(item => ((values = {}, options = {}) => {
              const __typename = 'EventSummaryType';
              values = (({ eventInfo = null }) => ({ eventInfo }))(values);
              values.__typename = __typename;
              return {
                eventInfo: ((values = {}, options = {}) => {
                  const __typename = 'EventType';
                  values = (({ id = null, title = null, imageUrl = null, dateTime = null }) => ({ id, title, imageUrl, dateTime }))(values);
                  values.__typename = __typename;
                  return {
                    id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
                    title: (values.title === null || values.title === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'title', __typename, scalarValues: options.scalarValues }) : values.title,
                    imageUrl: values.imageUrl,
                    dateTime: (values.dateTime === null || values.dateTime === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'DateTime', mappedTypeName: 'any', fieldName: 'dateTime', __typename, scalarValues: options.scalarValues }) : values.dateTime,
                    ...(options.addTypename ? { __typename } : {})
                  };
                })(values.eventInfo || undefined, options),
                ...(options.addTypename ? { __typename } : {})
              };
            })(item, options)),
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.venueEvents, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getVenueById, options)
  };
};

operations.GetWalletBalanceHistory = {};
operations.GetWalletBalanceHistory.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ period = undefined }) => ({ period }))(values);
  values.__typename = __typename;
  return {
    period: values.period
  };
};
operations.GetWalletBalanceHistory.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getWalletBalanceHistory = null }) => ({ getWalletBalanceHistory }))(values);
  values.__typename = __typename;
  return {
    getWalletBalanceHistory: !values.getWalletBalanceHistory ? values.getWalletBalanceHistory : ((values = {}, options = {}) => {
      const __typename = 'AssetBalanceHistoryType';
      values = (({ totalFiatBalance = null, start = null, end = null, minPrice = null, maxPrice = null, firstValidPointIndex = null, history = null }) => ({ totalFiatBalance, start, end, minPrice, maxPrice, firstValidPointIndex, history }))(values);
      values.__typename = __typename;
      return {
        totalFiatBalance: values.totalFiatBalance,
        start: values.start,
        end: values.end,
        minPrice: values.minPrice,
        maxPrice: values.maxPrice,
        firstValidPointIndex: values.firstValidPointIndex,
        history: !values.history ? values.history : values.history.map(item => ((values = {}, options = {}) => {
          const __typename = 'AssetHistoryPointType';
          values = (({ price = null, time = null }) => ({ price, time }))(values);
          values.__typename = __typename;
          return {
            price: values.price,
            time: values.time,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getWalletBalanceHistory, options)
  };
};

operations.MyAccounts = {};
operations.MyAccounts.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.MyAccounts.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ accounts = null }) => ({ accounts }))(values);
  values.__typename = __typename;
  return {
    accounts: !values.accounts ? values.accounts : values.accounts.map(item => ((values = {}, options = {}) => {
      const __typename = 'AccountType';
      values = (({ image = null, displayName = null, userName = null, id = null }) => ({ image, displayName, userName, id }))(values);
      values.__typename = __typename;
      return {
        image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
        displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
        userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.myUserProfile = {};
operations.myUserProfile.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.myUserProfile.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ myUserProfile = null }) => ({ myUserProfile }))(values);
  values.__typename = __typename;
  return {
    myUserProfile: !values.myUserProfile ? values.myUserProfile : ((values = {}, options = {}) => {
      const __typename = 'UserType';
      values = (({ firstName = null, lastName = null, fullName = null, createdOn = null }) => ({ firstName, lastName, fullName, createdOn }))(values);
      values.__typename = __typename;
      return {
        firstName: values.firstName,
        lastName: values.lastName,
        fullName: values.fullName,
        createdOn: values.createdOn,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.myUserProfile, options)
  };
};

operations.Me = {};
operations.Me.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.Me.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ me = null }) => ({ me }))(values);
  values.__typename = __typename;
  return {
    me: ((values = {}, options = {}) => {
      const __typename = 'AccountType';
      values = (({ userName = null, hasMultipleAccounts = null, hasMerchantAccount = null, isMerchant = null, displayName = null, image = null, id = null, city = null, isPrivate = null, phone = null, country = null, qr = null, merchantProfileDetails = null, recentlyTransactedWith = null }) => ({ userName, hasMultipleAccounts, hasMerchantAccount, isMerchant, displayName, image, id, city, isPrivate, phone, country, qr, merchantProfileDetails, recentlyTransactedWith }))(values);
      values.__typename = __typename;
      return {
        userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
        hasMultipleAccounts: values.hasMultipleAccounts,
        hasMerchantAccount: values.hasMerchantAccount,
        isMerchant: values.isMerchant,
        displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
        image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        city: values.city,
        isPrivate: values.isPrivate,
        phone: values.phone,
        country: !values.country ? values.country : ((values = {}, options = {}) => {
          const __typename = 'CountryType';
          values = (({ name = null, alpha2 = null, currencyCode = null }) => ({ name, alpha2, currencyCode }))(values);
          values.__typename = __typename;
          return {
            name: values.name,
            alpha2: values.alpha2,
            currencyCode: values.currencyCode,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.country, options),
        qr: !values.qr ? values.qr : ((values = {}, options = {}) => {
          const __typename = 'QRType';
          values = (({ image = null, code = null }) => ({ image, code }))(values);
          values.__typename = __typename;
          return {
            image: values.image,
            code: values.code,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.qr, options),
        merchantProfileDetails: !values.merchantProfileDetails ? values.merchantProfileDetails : ((values = {}, options = {}) => {
          const __typename = 'MerchantProfileType';
          values = (({ id = null, merchantType = null, displayName = null, address = null, status = null, currency = null, countryCode = null, acceptsPayments = null, payoutsEnabled = null, capabilities = null, geom = null, country = null }) => ({ id, merchantType, displayName, address, status, currency, countryCode, acceptsPayments, payoutsEnabled, capabilities, geom, country }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            merchantType: values.merchantType,
            displayName: values.displayName,
            address: !values.address ? values.address : ((values = {}, options = {}) => {
              const __typename = 'AddressType';
              values = (({ street = null, streetAdditional = null, city = null, region = null, postal = null }) => ({ street, streetAdditional, city, region, postal }))(values);
              values.__typename = __typename;
              return {
                street: values.street,
                streetAdditional: values.streetAdditional,
                city: values.city,
                region: values.region,
                postal: values.postal,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.address, options),
            status: values.status,
            currency: values.currency,
            countryCode: values.countryCode,
            acceptsPayments: values.acceptsPayments,
            payoutsEnabled: values.payoutsEnabled,
            capabilities: values.capabilities,
            geom: values.geom,
            country: !values.country ? values.country : ((values = {}, options = {}) => {
              const __typename = 'CountryType';
              values = (({ name = null, alpha2 = null }) => ({ name, alpha2 }))(values);
              values.__typename = __typename;
              return {
                name: values.name,
                alpha2: values.alpha2,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.country, options),
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.merchantProfileDetails, options),
        recentlyTransactedWith: !values.recentlyTransactedWith ? values.recentlyTransactedWith : values.recentlyTransactedWith.map(item => ((values = {}, options = {}) => {
          const __typename = 'AccountType';
          values = (({ id = null, userName = null, displayName = null, image = null }) => ({ id, userName, displayName, image }))(values);
          values.__typename = __typename;
          return {
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
            displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
            image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.me || undefined, options)
  };
};

operations.searchAccounts = {};
operations.searchAccounts.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ search = undefined, isMerchant = undefined }) => ({ search, isMerchant }))(values);
  values.__typename = __typename;
  return {
    search: (values.search === null || values.search === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'search', __typename, scalarValues: options.scalarValues }) : values.search,
    isMerchant: values.isMerchant
  };
};
operations.searchAccounts.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ searchAccounts = null }) => ({ searchAccounts }))(values);
  values.__typename = __typename;
  return {
    searchAccounts: !values.searchAccounts ? values.searchAccounts : values.searchAccounts.map(item => ((values = {}, options = {}) => {
      const __typename = 'AccountType';
      values = (({ id = null, userName = null, displayName = null, image = null, isMerchant = null }) => ({ id, userName, displayName, image, isMerchant }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
        displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
        image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
        isMerchant: values.isMerchant,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.isUsernameAvailable = {};
operations.isUsernameAvailable.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ keyword = undefined }) => ({ keyword }))(values);
  values.__typename = __typename;
  return {
    keyword: (values.keyword === null || values.keyword === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'keyword', __typename, scalarValues: options.scalarValues }) : values.keyword
  };
};
operations.isUsernameAvailable.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ isUsernameAvailable = null }) => ({ isUsernameAvailable }))(values);
  values.__typename = __typename;
  return {
    isUsernameAvailable: values.isUsernameAvailable
  };
};

operations.getBanks = {};
operations.getBanks.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.getBanks.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getBanks = null }) => ({ getBanks }))(values);
  values.__typename = __typename;
  return {
    getBanks: !values.getBanks ? values.getBanks : values.getBanks.map(item => ((values = {}, options = {}) => {
      const __typename = 'BankType';
      values = (({ id = null, lastFour = null, nickname = null, country = null, accountHolder = null, account = null }) => ({ id, lastFour, nickname, country, accountHolder, account }))(values);
      values.__typename = __typename;
      return {
        id: values.id,
        lastFour: values.lastFour,
        nickname: values.nickname,
        country: values.country,
        accountHolder: values.accountHolder,
        account: !values.account ? values.account : ((values = {}, options = {}) => {
          const __typename = 'AccountType';
          values = (({ userName = null, id = null }) => ({ userName, id }))(values);
          values.__typename = __typename;
          return {
            userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
            id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.account, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.getMarketList = {};
operations.getMarketList.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ period = undefined, limit = undefined }) => ({ period, limit }))(values);
  values.__typename = __typename;
  return {
    period: values.period,
    limit: values.limit
  };
};
operations.getMarketList.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getMarketList = null }) => ({ getMarketList }))(values);
  values.__typename = __typename;
  return {
    getMarketList: !values.getMarketList ? values.getMarketList : ((values = {}, options = {}) => {
      const __typename = 'AssetMarketMetricList';
      values = (({ assets = null }) => ({ assets }))(values);
      values.__typename = __typename;
      return {
        assets: !values.assets ? values.assets : values.assets.map(item => ((values = {}, options = {}) => {
          const __typename = 'AssetMetricType';
          values = (({ currency = null, name = null, code = null, logoImage = null, price = null, percentChangeOverPeriod = null }) => ({ currency, name, code, logoImage, price, percentChangeOverPeriod }))(values);
          values.__typename = __typename;
          return {
            currency: values.currency,
            name: values.name,
            code: values.code,
            logoImage: values.logoImage,
            price: values.price,
            percentChangeOverPeriod: values.percentChangeOverPeriod,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getMarketList, options)
  };
};

operations.getMarketTopMoversList = {};
operations.getMarketTopMoversList.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.getMarketTopMoversList.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ getMarketList = null }) => ({ getMarketList }))(values);
  values.__typename = __typename;
  return {
    getMarketList: !values.getMarketList ? values.getMarketList : ((values = {}, options = {}) => {
      const __typename = 'AssetMarketMetricList';
      values = (({ assets = null }) => ({ assets }))(values);
      values.__typename = __typename;
      return {
        assets: !values.assets ? values.assets : values.assets.map(item => ((values = {}, options = {}) => {
          const __typename = 'AssetMetricType';
          values = (({ currency = null, name = null, code = null, logoImage = null, price = null, percentChangeOverPeriod = null }) => ({ currency, name, code, logoImage, price, percentChangeOverPeriod }))(values);
          values.__typename = __typename;
          return {
            currency: values.currency,
            name: values.name,
            code: values.code,
            logoImage: values.logoImage,
            price: values.price,
            percentChangeOverPeriod: values.percentChangeOverPeriod,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.getMarketList, options)
  };
};

operations.searchForUserContacts = {};
operations.searchForUserContacts.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ contacts = undefined }) => ({ contacts }))(values);
  values.__typename = __typename;
  return {
    contacts: !values.contacts ? values.contacts : values.contacts.map(item => (ContactInput)(item, options))
  };
};
operations.searchForUserContacts.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ searchForUserContacts = null }) => ({ searchForUserContacts }))(values);
  values.__typename = __typename;
  return {
    searchForUserContacts: !values.searchForUserContacts ? values.searchForUserContacts : values.searchForUserContacts.map(item => ((values = {}, options = {}) => {
      const __typename = 'AccountType';
      values = (({ id = null, userName = null, displayName = null, image = null, isMerchant = null }) => ({ id, userName, displayName, image, isMerchant }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        userName: (values.userName === null || values.userName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'userName', __typename, scalarValues: options.scalarValues }) : values.userName,
        displayName: (values.displayName === null || values.displayName === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'displayName', __typename, scalarValues: options.scalarValues }) : values.displayName,
        image: (values.image === null || values.image === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'image', __typename, scalarValues: options.scalarValues }) : values.image,
        isMerchant: values.isMerchant,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.getWallet = {};
operations.getWallet.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ type = undefined }) => ({ type }))(values);
  values.__typename = __typename;
  return {
    type: values.type
  };
};
operations.getWallet.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ wallet = null }) => ({ wallet }))(values);
  values.__typename = __typename;
  return {
    wallet: !values.wallet ? values.wallet : ((values = {}, options = {}) => {
      const __typename = 'WalletType';
      values = (({ id = null, assets = null }) => ({ id, assets }))(values);
      values.__typename = __typename;
      return {
        id: values.id,
        assets: !values.assets ? values.assets : values.assets.map(item => ((values = {}, options = {}) => {
          const __typename = 'AssetBalanceType';
          values = (({ name = null, code = null, amount = null, logoImage = null, fiatAmount = null, currency = null, interestGaining = null, exchangeRate = null }) => ({ name, code, amount, logoImage, fiatAmount, currency, interestGaining, exchangeRate }))(values);
          values.__typename = __typename;
          return {
            name: values.name,
            code: values.code,
            amount: values.amount,
            logoImage: values.logoImage,
            fiatAmount: !values.fiatAmount ? values.fiatAmount : ((values = {}, options = {}) => {
              const __typename = 'ValueDisplay';
              values = (({ value = null, display = null, major = null }) => ({ value, display, major }))(values);
              values.__typename = __typename;
              return {
                value: values.value,
                display: values.display,
                major: values.major,
                ...(options.addTypename ? { __typename } : {})
              };
            })(values.fiatAmount, options),
            currency: values.currency,
            interestGaining: values.interestGaining,
            exchangeRate: values.exchangeRate,
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.wallet, options)
  };
};

const ImageDimensions = (values = {}, options = {}) => {
  const __typename = 'ImageDimensions';
  values = (({ h = undefined, w = undefined, x = undefined, y = undefined }) => ({ h, w, x, y }))(values);
  values.__typename = __typename;
  return {
    h: values.h,
    w: values.w,
    x: values.x,
    y: values.y
  };
};

const AddressInput = (values = {}, options = {}) => {
  const __typename = 'AddressInput';
  values = (({ additional = undefined, city = undefined, country = undefined, postal = undefined, region = undefined, street = undefined }) => ({ additional, city, country, postal, region, street }))(values);
  values.__typename = __typename;
  return {
    additional: values.additional,
    city: values.city,
    country: (values.country === null || values.country === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'country', __typename, scalarValues: options.scalarValues }) : values.country,
    postal: values.postal,
    region: values.region,
    street: values.street
  };
};

const BirthdayInput = (values = {}, options = {}) => {
  const __typename = 'BirthdayInput';
  values = (({ day = undefined, month = undefined, year = undefined }) => ({ day, month, year }))(values);
  values.__typename = __typename;
  return {
    day: values.day,
    month: values.month,
    year: values.year
  };
};

const StripePersonInput = (values = {}, options = {}) => {
  const __typename = 'StripePersonInput';
  values = (({ address = undefined, dob = undefined, email = undefined, firstName = undefined, govId = undefined, isDirector = undefined, isExecutive = undefined, isOwner = undefined, isRepresentative = undefined, lastName = undefined, phone = undefined, title = undefined }) => ({ address, dob, email, firstName, govId, isDirector, isExecutive, isOwner, isRepresentative, lastName, phone, title }))(values);
  values.__typename = __typename;
  return {
    address: !values.address ? values.address : (AddressInput)(values.address, options),
    dob: !values.dob ? values.dob : (BirthdayInput)(values.dob, options),
    email: values.email,
    firstName: values.firstName,
    govId: values.govId,
    isDirector: values.isDirector,
    isExecutive: values.isExecutive,
    isOwner: values.isOwner,
    isRepresentative: values.isRepresentative,
    lastName: values.lastName,
    phone: values.phone,
    title: values.title
  };
};

const TicketsWithAmount = (values = {}, options = {}) => {
  const __typename = 'TicketsWithAmount';
  values = (({ id = undefined, quantity = undefined }) => ({ id, quantity }))(values);
  values.__typename = __typename;
  return {
    id: values.id,
    quantity: values.quantity
  };
};

const StripeUpdateFieldInput = (values = {}, options = {}) => {
  const __typename = 'StripeUpdateFieldInput';
  values = (({ fieldName = undefined, value = undefined }) => ({ fieldName, value }))(values);
  values.__typename = __typename;
  return {
    fieldName: values.fieldName,
    value: values.value
  };
};

const StripeUpdatePersonFieldsInput = (values = {}, options = {}) => {
  const __typename = 'StripeUpdatePersonFieldsInput';
  values = (({ fields = undefined, govId = undefined, id = undefined, relationships = undefined }) => ({ fields, govId, id, relationships }))(values);
  values.__typename = __typename;
  return {
    fields: !values.fields ? values.fields : values.fields.map(item => (StripeUpdateFieldInput)(item, options)),
    govId: values.govId,
    id: values.id,
    relationships: values.relationships
  };
};

const StripeUpdateBusinessFieldsInput = (values = {}, options = {}) => {
  const __typename = 'StripeUpdateBusinessFieldsInput';
  values = (({ fields = undefined, govId = undefined, id = undefined, type = undefined }) => ({ fields, govId, id, type }))(values);
  values.__typename = __typename;
  return {
    fields: !values.fields ? values.fields : values.fields.map(item => (StripeUpdateFieldInput)(item, options)),
    govId: values.govId,
    id: values.id,
    type: values.type
  };
};

const GeometricSearchInput = (values = {}, options = {}) => {
  const __typename = 'GeometricSearchInput';
  values = (({ firstCoordinate = undefined, secondCoordinate = undefined }) => ({ firstCoordinate, secondCoordinate }))(values);
  values.__typename = __typename;
  return {
    firstCoordinate: values.firstCoordinate,
    secondCoordinate: values.secondCoordinate
  };
};

const ContactInput = (values = {}, options = {}) => {
  const __typename = 'ContactInput';
  values = (({ emails = undefined, phoneNumbers = undefined }) => ({ emails, phoneNumbers }))(values);
  values.__typename = __typename;
  return {
    emails: values.emails,
    phoneNumbers: values.phoneNumbers
  };
};
function handleJsonRequest(r) {
    if (r.ok) {
        console.log(`OK ✅ - Status: ${r.status}; Text: ${r.statusText}; Type: ${r.type}; URL: ${r.url}.`);
		return r.json();
    } else {
        console.error(`Something went wrong... Status: ${r.status}; Text: ${r.statusText}; Type: ${r.type}; URL: ${r.url}.`);
    }
	throw new Error(`Error with fetch! #${r.status} - ${r.statusText} from URL: ${r.url}`);
}

// address -> operator address
async function getRadixValidatorInfo( address ) {
    const	gateway = "https://mainnet-gateway.radixdlt.com",
            network = "mainnet",
            validatorAddress = "rv1qdawftdkvx385rmgeejalhxca0xwxhpgrzt9tuv23p08hxr39ypwv8y9e8l",
            RADIX_TOKEN_DIGITS = 18,    // 18 is the number of digits. Unfortunately we can't get this number elsewhere.
            RADIX_ACTIVE_SET_AMOUNT = 100,  // Unfortunately we can't get this number elsewhere either.
            radixScanUrl = "https://www.radixscan.io/raw/validator/",
            jsonHeader = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }},
            postMethod = { method: 'POST' },
            noCorsMode = { mode: 'no-cors' },
            networkBody = {
                "network_identifier": {
                    "network": network
                }
            },
            validatorIdBody = {
                "validator_identifier": {
                    "address": validatorAddress
                }
            },
            validatorInfoRequest = new Request (`${ gateway }/validator`, Object.assign({
                body: JSON.stringify(Object.assign({}, networkBody, validatorIdBody))
            }, jsonHeader, postMethod)),
            validatorDelegatorCountRequest = new Request(`${ gateway }/validator/stakes`, Object.assign({
                body: JSON.stringify(Object.assign({ "limit": 1 }, networkBody, validatorIdBody))
            }, jsonHeader, postMethod)),
            validatorListRequest = new Request(`${ gateway }/validators`, Object.assign({
                body: JSON.stringify(networkBody)
            }, jsonHeader, postMethod)),
            /*validatorListApyRequest = new Request(radixScanUrl, Object.assign({
                // no body needed, and default method is already GET.
            }, jsonHeader, noCorsMode)),*/
            numberFormatter = Intl.NumberFormat('en', {notation: 'compact'}),
            roundRadixDigits = (number) => { return Math.floor(number / Math.pow(10, RADIX_TOKEN_DIGITS-2))/100 }
            ;

    try {
        const [ validatorInfo, validatorDelegatorCount, /*validatorListApy,*/ validatorList ] = await Promise.all(
            [
                fetch( validatorInfoRequest ).then(r => handleJsonRequest(r)),
                fetch( validatorDelegatorCountRequest ).then(r => handleJsonRequest(r)),
                /*fetch( validatorListApyRequest ).then(r => handleJsonRequest(r)),*/
                fetch( validatorListRequest ).then(r => handleJsonRequest(r)),
            ]
        );

        if (!validatorInfo) {
            console.error('Invalid validator operator address.');
            return;
        }

        const tokens    = roundRadixDigits(validatorInfo.validator.stake.value), 
            shortTokens	= numberFormatter.format(tokens),
            numDelegators = validatorDelegatorCount.total_count,
            shortDelegators = numberFormatter.format(numDelegators),
            //status 		= validator.status, // non-existent on Radix (so far)
            moniker		= validatorInfo.validator.properties.name,
            website		= validatorInfo.validator.properties.url,
            commRatePercent		=	`${ validatorInfo.validator.properties.validator_fee_percentage }%`,
            selfDelegation		= roundRadixDigits(validatorInfo.validator.info.owner_stake.value);
            //validatorApy = `${ validatorListApy.validators.find( val => val.validator_identifier.address === validatorAddress).Apy30Day }%`;
            
        //console.log(`Returns: Radix Validator APY: ${ validatorApy }%.`);

        const validators = validatorList.validators.sort((a,b) => {	return b.stake.value - a.stake.value	}),
            rank    = validators.findIndex( v => v.validator_identifier.address === address )+1,
            active  = rank < RADIX_ACTIVE_SET_AMOUNT? true : false/*,
            delegators = r.delegation_responses,
            totalActive	=	validators.reduce(
                (sum, v) => sum + (v.status === "BOND_STATUS_BONDED"? 1 : 0)
                , 0)*/;

        const returnObj = {
            success: 			true,
            validatorName: 		moniker,
            validatorAddress: 	address,
            commissionRate: 	commRatePercent,
            numDelegators: 		numDelegators,
            totalDelegations: 	tokens,
            shortTokens:        shortTokens,
            rank:				rank,
            validatorsLength:   validators.length,
            active:             active
        }

        console.table(returnObj);
        return returnObj;

    } catch (e) {
        // log error
        console.error('Execution failed!', e.message);

        return Response.json({ success: false, error: e.message}, { status: 500 });
    }
}
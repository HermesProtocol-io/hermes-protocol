function handleJsonRequest(r) {
	if (r.ok)
		return r.json();
	throw new Error(`Error with fetch! #${r.status} - ${r.statusText} from URL: ${r.url}`);
}

// address -> terravaloper address
// shortInfo -> boolean to get full Validator info or not
async function getTerraValidatorInfo( address, shortInfo ) {
    const	classicLcd = "columbus-lcd.terra.dev",
            phoenixLcd = "phoenix-lcd.terra.dev",
            reqUrl = (isClassic, validatorAddress, getDelegations = false) => {
                return `https://${isClassic? classicLcd : phoenixLcd}/cosmos/staking/v1beta1/validators/${validatorAddress}${getDelegations? "/delegations?pagination.limit=20000" : ''}`
            },
            validatorsUrl = (isClassic = false) => {
                return `https://${isClassic? classicLcd : phoenixLcd}/cosmos/staking/v1beta1/validators?pagination.limit=20000`
            },
            stakingReturnUrl = "https://phoenix-api.terra.dev/chart/staking-return/annualized",
            numberFormatter = Intl.NumberFormat('en', {notation: 'compact'}),
            jsonHeader = { headers: { 'Accept': 'application/json' }};

    try {
        const [classicValidator, phoenixValidator, yearlyStakingReturns] = await Promise.all(
            [	// Terra
                fetch(reqUrl(true, address), jsonHeader).then(r => r.json()),
                fetch(reqUrl(false, address), jsonHeader).then(r => r.json()),
                fetch(stakingReturnUrl, jsonHeader).then(r => handleJsonRequest(r)),
            ]
        );
        
        const network = phoenixValidator?.validator? "terra" : "terraClassic",
            validator = network === "terraClassic"? classicValidator.validator : phoenixValidator.validator;

        if (!validator) {
            console.error('Invalid validator operator address (terravaloper...).');
            return;
        }

        const jailed	= validator.jailed,
            tokens	 	= Math.floor(validator.tokens / 10000)/100 ,
            shortTokens	= numberFormatter.format(tokens),
            status 		= validator.status,
            humanStatus	= status === "BOND_STATUS_BONDED"? "active" : status,
            moniker		= validator.description.moniker,
            identity	= validator.description.identity,
            website		= validator.description.website,
            details		= validator.description.details,
            commRate	= validator.commission.commission_rates.rate,
            commRatePercent		=	`${Math.floor(commRate*10000)/100}%`,
            commMaxRate			= validator.commission.commission_rates.max_rate,
            commMaxRatePercent	=	`${Math.floor(commMaxRate*10000)/100}%`,
            commMaxRateChange	= validator.commission.commission_rates.max_change_rate,
            selfDelegation		= validator.min_self_delegation,
            yearlyStakingReturn = yearlyStakingReturns[ yearlyStakingReturns.length -1 ].value;

        //console.log(`Returns: Staking APR: ${yearlyStakingReturn*100}%.`);

        if (shortInfo)
            return {
                validatorName: 		moniker,
                validatorAddress: 	validator.operator_address,
                commissionRate: 	commRatePercent,
                totalDelegations: 	tokens,
                shortTokens:        shortTokens,
                status:				status,
                fetchUrl: 			`${reqUrl(network === "terraClassic", address, true)}`
            };

        //console.log(`Fetching delegations for ${validator.description.moniker} (${address}) on ${network}...`);
        const [ r, rVals ] = await Promise.all(
            [
                fetch(reqUrl(network === "terraClassic", address, true), jsonHeader).then(r => handleJsonRequest(r)),
                fetch( validatorsUrl( network === "terraClassic" ), jsonHeader).then(r => handleJsonRequest(r)),
            ]
        );

        const validators = rVals.validators.sort((a,b) => {	return b.tokens - a.tokens	}),
            rank  = validators.findIndex( v => v.operator_address === validator.operator_address )+1,
            delegators = r.delegation_responses,
            delegationsSum = Math.floor(delegators.reduce(
                (sum, delegation)	=>	sum + delegation.balance.amount / 1000000
                , 0)*100)/100,
            totalActive	=	validators.reduce(
                (sum, v) => sum + (v.status === "BOND_STATUS_BONDED"? 1 : 0)
                , 0);

        return {
                success: 			true,
                validatorName: 		moniker,
                validatorAddress: 	address,
                commissionRate: 	commRatePercent,
                numDelegators: 		delegators.length,
                totalDelegations: 	delegationsSum,
                shortTokens:        shortTokens,
                status:				status,
                rank:				rank,
                totalValidators:    totalActive,
                fetchUrl: 			`${reqUrl(network === "terraClassic", address, true)}`
            };

    } catch (e) {
        // log error
        console.error('Execution failed!', e.message);

        return Response.json({ success: false, error: e.message}, { status: 500 });
    }
}
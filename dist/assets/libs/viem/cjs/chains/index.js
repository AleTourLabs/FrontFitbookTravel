"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.okc = exports.nexi = exports.moonriver = exports.moonbeam = exports.moonbaseAlpha = exports.metisGoerli = exports.metis = exports.mainnet = exports.localhost = exports.lineaTestnet = exports.klaytn = exports.harmonyOne = exports.hardhat = exports.haqqTestedge2 = exports.haqqMainnet = exports.gnosisChiado = exports.gnosis = exports.goerli = exports.iotexTestnet = exports.iotex = exports.foundry = exports.flareTestnet = exports.flare = exports.filecoinHyperspace = exports.filecoinCalibration = exports.filecoin = exports.fantomTestnet = exports.fantom = exports.evmosTestnet = exports.evmos = exports.dogechain = exports.dfk = exports.crossbell = exports.cronos = exports.celoCannoli = exports.celoAlfajores = exports.celo = exports.canto = exports.bscTestnet = exports.bsc = exports.bronosTestnet = exports.bronos = exports.boba = exports.baseGoerli = exports.avalancheFuji = exports.avalanche = exports.auroraTestnet = exports.aurora = exports.arbitrumGoerli = exports.arbitrum = void 0;
exports.zoraTestnet = exports.zora = exports.zkSyncTestnet = exports.zkSync = exports.zhejiang = exports.xdcTestnet = exports.xdc = exports.wanchainTestnet = exports.wanchain = exports.thunderTestnet = exports.telosTestnet = exports.telos = exports.taraxaTestnet = exports.taraxa = exports.syscoin = exports.shardeumSphinx = exports.songbirdTestnet = exports.songbird = exports.skaleTitanTestnet = exports.skaleTitan = exports.skaleRazor = exports.skaleNebulaTestnet = exports.skaleNebula = exports.skaleHumanProtocol = exports.skaleExorde = exports.skaleEuropaTestnet = exports.skaleEuropa = exports.skaleCryptoColosseum = exports.skaleCryptoBlades = exports.skaleChaosTestnet = exports.skaleCalypsoTestnet = exports.skaleCalypso = exports.skaleBlockBrawlers = exports.sepolia = exports.scrollTestnet = exports.pulsechainV4 = exports.pulsechain = exports.polygonZkEvmTestnet = exports.polygonZkEvm = exports.polygonMumbai = exports.polygon = exports.optimismGoerli = exports.optimism = void 0;
const chains = require("@wagmi/chains");
const chain_js_1 = require("../utils/chain.js");
const celo_js_1 = require("./formatters/celo.js");
const optimism_js_1 = require("./formatters/optimism.js");
const celo_js_2 = require("./serializers/celo.js");
exports.arbitrum = (0, chain_js_1.defineChain)(chains.arbitrum);
exports.arbitrumGoerli = (0, chain_js_1.defineChain)(chains.arbitrumGoerli);
exports.aurora = (0, chain_js_1.defineChain)(chains.aurora);
exports.auroraTestnet = (0, chain_js_1.defineChain)(chains.auroraTestnet);
exports.avalanche = (0, chain_js_1.defineChain)(chains.avalanche);
exports.avalancheFuji = (0, chain_js_1.defineChain)(chains.avalancheFuji);
exports.baseGoerli = (0, chain_js_1.defineChain)(chains.baseGoerli);
exports.boba = (0, chain_js_1.defineChain)(chains.boba);
exports.bronos = (0, chain_js_1.defineChain)(chains.bronos);
exports.bronosTestnet = (0, chain_js_1.defineChain)(chains.bronosTestnet);
exports.bsc = (0, chain_js_1.defineChain)(chains.bsc);
exports.bscTestnet = (0, chain_js_1.defineChain)(chains.bscTestnet);
exports.canto = (0, chain_js_1.defineChain)(chains.canto);
exports.celo = (0, chain_js_1.defineChain)(chains.celo, {
    formatters: celo_js_1.celoFormatters,
    serializers: celo_js_2.celoSerializers,
});
exports.celoAlfajores = (0, chain_js_1.defineChain)(chains.celoAlfajores, {
    formatters: celo_js_1.celoFormatters,
    serializers: celo_js_2.celoSerializers,
});
exports.celoCannoli = (0, chain_js_1.defineChain)(chains.celoCannoli, {
    formatters: celo_js_1.celoFormatters,
    serializers: celo_js_2.celoSerializers,
});
exports.cronos = (0, chain_js_1.defineChain)(chains.cronos);
exports.crossbell = (0, chain_js_1.defineChain)(chains.crossbell);
exports.dfk = (0, chain_js_1.defineChain)(chains.dfk);
exports.dogechain = (0, chain_js_1.defineChain)(chains.dogechain);
exports.evmos = (0, chain_js_1.defineChain)(chains.evmos);
exports.evmosTestnet = (0, chain_js_1.defineChain)(chains.evmosTestnet);
exports.fantom = (0, chain_js_1.defineChain)(chains.fantom);
exports.fantomTestnet = (0, chain_js_1.defineChain)(chains.fantomTestnet);
exports.filecoin = (0, chain_js_1.defineChain)(chains.filecoin);
exports.filecoinCalibration = (0, chain_js_1.defineChain)(chains.filecoinCalibration);
exports.filecoinHyperspace = (0, chain_js_1.defineChain)(chains.filecoinHyperspace);
exports.flare = (0, chain_js_1.defineChain)(chains.flare);
exports.flareTestnet = (0, chain_js_1.defineChain)(chains.flareTestnet);
exports.foundry = (0, chain_js_1.defineChain)(chains.foundry);
exports.iotex = (0, chain_js_1.defineChain)(chains.iotex);
exports.iotexTestnet = (0, chain_js_1.defineChain)(chains.iotexTestnet);
exports.goerli = (0, chain_js_1.defineChain)(chains.goerli);
exports.gnosis = (0, chain_js_1.defineChain)(chains.gnosis);
exports.gnosisChiado = (0, chain_js_1.defineChain)(chains.gnosisChiado);
exports.haqqMainnet = (0, chain_js_1.defineChain)(chains.haqqMainnet);
exports.haqqTestedge2 = (0, chain_js_1.defineChain)(chains.haqqTestedge2);
exports.hardhat = (0, chain_js_1.defineChain)(chains.hardhat);
exports.harmonyOne = (0, chain_js_1.defineChain)(chains.harmonyOne);
exports.klaytn = (0, chain_js_1.defineChain)(chains.klaytn);
exports.lineaTestnet = (0, chain_js_1.defineChain)(chains.lineaTestnet);
exports.localhost = (0, chain_js_1.defineChain)(chains.localhost);
exports.mainnet = (0, chain_js_1.defineChain)(chains.mainnet);
exports.metis = (0, chain_js_1.defineChain)(chains.metis);
exports.metisGoerli = (0, chain_js_1.defineChain)(chains.metisGoerli);
exports.moonbaseAlpha = (0, chain_js_1.defineChain)(chains.moonbaseAlpha);
exports.moonbeam = (0, chain_js_1.defineChain)(chains.moonbeam);
exports.moonriver = (0, chain_js_1.defineChain)(chains.moonriver);
exports.nexi = (0, chain_js_1.defineChain)(chains.nexi);
exports.okc = (0, chain_js_1.defineChain)(chains.okc);
exports.optimism = (0, chain_js_1.defineChain)(chains.optimism, {
    formatters: optimism_js_1.optimismFormatters,
});
exports.optimismGoerli = (0, chain_js_1.defineChain)(chains.optimismGoerli, {
    formatters: optimism_js_1.optimismFormatters,
});
exports.polygon = (0, chain_js_1.defineChain)(chains.polygon);
exports.polygonMumbai = (0, chain_js_1.defineChain)(chains.polygonMumbai);
exports.polygonZkEvm = (0, chain_js_1.defineChain)(chains.polygonZkEvm);
exports.polygonZkEvmTestnet = (0, chain_js_1.defineChain)(chains.polygonZkEvmTestnet);
exports.pulsechain = (0, chain_js_1.defineChain)(chains.pulsechain);
exports.pulsechainV4 = (0, chain_js_1.defineChain)(chains.pulsechainV4);
exports.scrollTestnet = (0, chain_js_1.defineChain)(chains.scrollTestnet);
exports.sepolia = (0, chain_js_1.defineChain)(chains.sepolia);
exports.skaleBlockBrawlers = (0, chain_js_1.defineChain)(chains.skaleBlockBrawlers);
exports.skaleCalypso = (0, chain_js_1.defineChain)(chains.skaleCalypso);
exports.skaleCalypsoTestnet = (0, chain_js_1.defineChain)(chains.skaleCalypsoTestnet);
exports.skaleChaosTestnet = (0, chain_js_1.defineChain)(chains.skaleChaosTestnet);
exports.skaleCryptoBlades = (0, chain_js_1.defineChain)(chains.skaleCryptoBlades);
exports.skaleCryptoColosseum = (0, chain_js_1.defineChain)(chains.skaleCryptoColosseum);
exports.skaleEuropa = (0, chain_js_1.defineChain)(chains.skaleEuropa);
exports.skaleEuropaTestnet = (0, chain_js_1.defineChain)(chains.skaleEuropaTestnet);
exports.skaleExorde = (0, chain_js_1.defineChain)(chains.skaleExorde);
exports.skaleHumanProtocol = (0, chain_js_1.defineChain)(chains.skaleHumanProtocol);
exports.skaleNebula = (0, chain_js_1.defineChain)(chains.skaleNebula);
exports.skaleNebulaTestnet = (0, chain_js_1.defineChain)(chains.skaleNebulaTestnet);
exports.skaleRazor = (0, chain_js_1.defineChain)(chains.skaleRazor);
exports.skaleTitan = (0, chain_js_1.defineChain)(chains.skaleTitan);
exports.skaleTitanTestnet = (0, chain_js_1.defineChain)(chains.skaleTitanTestnet);
exports.songbird = (0, chain_js_1.defineChain)(chains.songbird);
exports.songbirdTestnet = (0, chain_js_1.defineChain)(chains.songbirdTestnet);
exports.shardeumSphinx = (0, chain_js_1.defineChain)(chains.shardeumSphinx);
exports.syscoin = (0, chain_js_1.defineChain)(chains.syscoin);
exports.taraxa = (0, chain_js_1.defineChain)(chains.taraxa);
exports.taraxaTestnet = (0, chain_js_1.defineChain)(chains.taraxaTestnet);
exports.telos = (0, chain_js_1.defineChain)(chains.telos);
exports.telosTestnet = (0, chain_js_1.defineChain)(chains.telosTestnet);
exports.thunderTestnet = (0, chain_js_1.defineChain)(chains.thunderTestnet);
exports.wanchain = (0, chain_js_1.defineChain)(chains.wanchain);
exports.wanchainTestnet = (0, chain_js_1.defineChain)(chains.wanchainTestnet);
exports.xdc = (0, chain_js_1.defineChain)(chains.xdc);
exports.xdcTestnet = (0, chain_js_1.defineChain)(chains.xdcTestnet);
exports.zhejiang = (0, chain_js_1.defineChain)(chains.zhejiang);
exports.zkSync = (0, chain_js_1.defineChain)(chains.zkSync);
exports.zkSyncTestnet = (0, chain_js_1.defineChain)(chains.zkSyncTestnet);
exports.zora = (0, chain_js_1.defineChain)(chains.zora);
exports.zoraTestnet = (0, chain_js_1.defineChain)(chains.zoraTestnet);
//# sourceMappingURL=index.js.map
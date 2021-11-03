(function () {
  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    "+LV5":
    /*!*******************************************************!*\
      !*** ./libs/ngrx/src/lib/bullState/bull.selectors.ts ***!
      \*******************************************************/

    /*! exports provided: selectBulls, selectBullByTag */

    /***/
    function LV5(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectBulls", function () {
        return selectBulls;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectBullByTag", function () {
        return selectBullByTag;
      });
      /* harmony import */


      var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @ngrx/store */
      "l7P3");
      /* harmony import */


      var _bull_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./bull.reducer */
      "Lpkz");

      var selectBulls = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_bull_reducer__WEBPACK_IMPORTED_MODULE_1__["selectAll"], function (bulls) {
        return bulls.filter(function (bull) {
          return bull.tagNumber !== 'null';
        });
      });
      var selectBullByTag = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_bull_reducer__WEBPACK_IMPORTED_MODULE_1__["selectAll"], function (bulls, props) {
        return bulls.find(function (bull) {
          return bull.tagNumber == props.tagNumber;
        });
      });
      /***/
    },

    /***/
    "/JzY":
    /*!*****************************************************!*\
      !*** ./libs/ngrx/src/lib/bullState/bull.actions.ts ***!
      \*****************************************************/

    /*! exports provided: BullActionTypes, LoadBullsFinished, RetreieveBullData, LoadBulls, AddBull, UpsertBull, AddBulls, UpsertBulls, UpdateBull, UpdateBulls, DeleteBull, DeleteBulls, ClearBulls */

    /***/
    function JzY(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BullActionTypes", function () {
        return BullActionTypes;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LoadBullsFinished", function () {
        return LoadBullsFinished;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "RetreieveBullData", function () {
        return RetreieveBullData;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LoadBulls", function () {
        return LoadBulls;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AddBull", function () {
        return AddBull;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UpsertBull", function () {
        return UpsertBull;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AddBulls", function () {
        return AddBulls;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UpsertBulls", function () {
        return UpsertBulls;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UpdateBull", function () {
        return UpdateBull;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UpdateBulls", function () {
        return UpdateBulls;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DeleteBull", function () {
        return DeleteBull;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DeleteBulls", function () {
        return DeleteBulls;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ClearBulls", function () {
        return ClearBulls;
      });

      var BullActionTypes;

      (function (BullActionTypes) {
        BullActionTypes["LoadBulls"] = "[Bull] Load Bulls";
        BullActionTypes["AddBull"] = "[Bull] Add Bull";
        BullActionTypes["UpsertBull"] = "[Bull] Upsert Bull";
        BullActionTypes["AddBulls"] = "[Bull] Add Bulls";
        BullActionTypes["UpsertBulls"] = "[Bull] Upsert Bulls";
        BullActionTypes["UpdateBull"] = "[Bull] Update Bull";
        BullActionTypes["UpdateBulls"] = "[Bull] Update Bulls";
        BullActionTypes["DeleteBull"] = "[Bull] Delete Bull";
        BullActionTypes["DeleteBulls"] = "[Bull] Delete Bulls";
        BullActionTypes["ClearBulls"] = "[Bull] Clear Bulls";
        BullActionTypes["RetrieveBulls"] = "[Bull] Retrieve Data";
        BullActionTypes["LoadBullsFinished"] = "[Bull] Load Finished";
      })(BullActionTypes || (BullActionTypes = {}));

      var LoadBullsFinished = function LoadBullsFinished() {
        _classCallCheck(this, LoadBullsFinished);

        this.type = BullActionTypes.LoadBullsFinished;
      };

      var RetreieveBullData = function RetreieveBullData() {
        _classCallCheck(this, RetreieveBullData);

        this.type = BullActionTypes.RetrieveBulls;
      };

      var LoadBulls = function LoadBulls(payload) {
        _classCallCheck(this, LoadBulls);

        this.payload = payload;
        this.type = BullActionTypes.LoadBulls;
      };

      var AddBull = function AddBull(payload) {
        _classCallCheck(this, AddBull);

        this.payload = payload;
        this.type = BullActionTypes.AddBull;
      };

      var UpsertBull = function UpsertBull(payload) {
        _classCallCheck(this, UpsertBull);

        this.payload = payload;
        this.type = BullActionTypes.UpsertBull;
      };

      var AddBulls = function AddBulls(payload) {
        _classCallCheck(this, AddBulls);

        this.payload = payload;
        this.type = BullActionTypes.AddBulls;
      };

      var UpsertBulls = function UpsertBulls(payload) {
        _classCallCheck(this, UpsertBulls);

        this.payload = payload;
        this.type = BullActionTypes.UpsertBulls;
      };

      var UpdateBull = function UpdateBull(payload) {
        _classCallCheck(this, UpdateBull);

        this.payload = payload;
        this.type = BullActionTypes.UpdateBull;
      };

      var UpdateBulls = function UpdateBulls(payload) {
        _classCallCheck(this, UpdateBulls);

        this.payload = payload;
        this.type = BullActionTypes.UpdateBulls;
      };

      var DeleteBull = function DeleteBull(payload) {
        _classCallCheck(this, DeleteBull);

        this.payload = payload;
        this.type = BullActionTypes.DeleteBull;
      };

      var DeleteBulls = function DeleteBulls(payload) {
        _classCallCheck(this, DeleteBulls);

        this.payload = payload;
        this.type = BullActionTypes.DeleteBulls;
      };

      var ClearBulls = function ClearBulls() {
        _classCallCheck(this, ClearBulls);

        this.type = BullActionTypes.ClearBulls;
      };
      /***/

    },

    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! D:\DissertationApplications\CMSFrontEnd\src\main.ts */
      "zUnb");
      /***/
    },

    /***/
    "08Dv":
    /*!******************************************!*\
      !*** ./src/assets/cattleBreedCodes.json ***!
      \******************************************/

    /*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, default */

    /***/
    function Dv(module) {
      module.exports = JSON.parse("[{\"code\":\"PRX\",\"breed\":\"PIE ROUGE CROSS\"},{\"code\":\"PR\",\"breed\":\"PIE ROUGE\"},{\"code\":\"ALLX\",\"breed\":\"AUSTRALIAN LOWLINE X\"},{\"code\":\"KIWIX\",\"breed\":\"KIWI CROSS\"},{\"code\":\"KIWI\",\"breed\":\"KIWI\"},{\"code\":\"LVX\",\"breed\":\"LAKENVELDER CROSS\"},{\"code\":\"LV\",\"breed\":\"LAKENVELDER\"},{\"code\":\"ABX\",\"breed\":\"ABONDANCE CROSS\"},{\"code\":\"AB\",\"breed\":\"ABONDANCE\"},{\"code\":\"YKX\",\"breed\":\"YAK CROSS\"},{\"code\":\"HSX\",\"breed\":\"HUNGARIAN STEPPE X\"},{\"code\":\"HS\",\"breed\":\"HUNGARIAN STEPPE\"},{\"code\":\"CWX\",\"breed\":\"COLOURED WELSH CROSS\"},{\"code\":\"CW\",\"breed\":\"COLOURED WELSH\"},{\"code\":\"BDX\",\"breed\":\"BELTED DUTCH CROSS\"},{\"code\":\"BD\",\"breed\":\"BELTED DUTCH\"},{\"code\":\"HKX\",\"breed\":\"HECK CROSS\"},{\"code\":\"HK\",\"breed\":\"HECK\"},{\"code\":\"SPX\",\"breed\":\"SPECKLE PARK CROSS\"},{\"code\":\"SP\",\"breed\":\"SPECKLE PARK\"},{\"code\":\"BRBX\",\"breed\":\"BRITISH BLUE X\"},{\"code\":\"BRB\",\"breed\":\"BRITISH BLUE\"},{\"code\":\"SR\",\"breed\":\"SWEDISH RED\"},{\"code\":\"SRP\",\"breed\":\"SWEDISH RED POLLED\"},{\"code\":\"ERX\",\"breed\":\"ESTONIAN RED CROSS\"},{\"code\":\"ER\",\"breed\":\"ESTONIAN RED\"},{\"code\":\"ALL\",\"breed\":\"AUSTRALIAN LOWLINE\"},{\"code\":\"SRX\",\"breed\":\"SWEDISH RED CROSS\"},{\"code\":\"NDS\",\"breed\":\"NORTHERN DAIRY SH\"},{\"code\":\"RGX\",\"breed\":\"RIGGITGALLOWAY CROSS\"},{\"code\":\"RG\",\"breed\":\"RIGGIT GALLOWAY\"},{\"code\":\"FKVX\",\"breed\":\"FLECKVIEH CROSS\"},{\"code\":\"FKV\",\"breed\":\"FLECKVIEH\"},{\"code\":\"GY\",\"breed\":\"GUERNSEY\"},{\"code\":\"GYX\",\"breed\":\"GUERNSEY X\"},{\"code\":\"OD\",\"breed\":\"OTHER DAIRY\"},{\"code\":\"NRX\",\"breed\":\"NORWEGIAN RED X\"},{\"code\":\"HL\",\"breed\":\"HIGHLAND\"},{\"code\":\"CHIX\",\"breed\":\"CHIANINA X\"},{\"code\":\"GA\",\"breed\":\"GALLOWAY\"},{\"code\":\"TBX\",\"breed\":\"TYRONE BLACK X\"},{\"code\":\"DZE\",\"breed\":\"DWARF ZEBU\"},{\"code\":\"CHI\",\"breed\":\"CHIANINA\"},{\"code\":\"FRX\",\"breed\":\"FRIESIAN X\"},{\"code\":\"EFBX\",\"breed\":\"EAST FINNISH BROWN X\"},{\"code\":\"LRX\",\"breed\":\"LINCOLN RED X\"},{\"code\":\"SHOX\",\"breed\":\"SHORTHORN X\"},{\"code\":\"SB\",\"breed\":\"SWISS BRAUNVIEH\"},{\"code\":\"LIX\",\"breed\":\"LIMOUSIN X\"},{\"code\":\"SD\",\"breed\":\"SOUTH DEVON\"},{\"code\":\"AA\",\"breed\":\"ABERDEEN ANGUS\"},{\"code\":\"DR\",\"breed\":\"DANISH RED\"},{\"code\":\"GL\",\"breed\":\"GLOUCESTER\"},{\"code\":\"HOX\",\"breed\":\"HOLSTEIN X\"},{\"code\":\"OB\",\"breed\":\"OTHER BEEF\"},{\"code\":\"BEL\",\"breed\":\"BEEFALO\"},{\"code\":\"NOX\",\"breed\":\"NORMANDE X\"},{\"code\":\"HF\",\"breed\":\"HOLSTEIN FRIESIAN\"},{\"code\":\"PIX\",\"breed\":\"PIEMONTESE X\"},{\"code\":\"BRX\",\"breed\":\"BRAHMAN X\"},{\"code\":\"LIM\",\"breed\":\"LIMOUSIN\"},{\"code\":\"GU\",\"breed\":\"GUERNSEY\"},{\"code\":\"DSX\",\"breed\":\"DAIRY SHORTHORN X\"},{\"code\":\"MAR\",\"breed\":\"MARCHIGIANA\"},{\"code\":\"HER\",\"breed\":\"HEREFORD (RED)\"},{\"code\":\"WA\",\"breed\":\"WAGYU\"},{\"code\":\"LIMBX\",\"breed\":\"LIMOUSIN (BLACK) X\"},{\"code\":\"SOBX\",\"breed\":\"SWISS ORIG BRAUNV X\"},{\"code\":\"BF\",\"breed\":\"BRITISH FRIESIAN\"},{\"code\":\"VN\",\"breed\":\"VALDOSTANA NERA\"},{\"code\":\"BAWX\",\"breed\":\"BLONDE D'AQU(WHITE)X\"},{\"code\":\"BSX\",\"breed\":\"BROWN SWISS X\"},{\"code\":\"WWX\",\"breed\":\"WELSH WHITE X\"},{\"code\":\"LIM X\",\"breed\":\"LIMOUSIN X\"},{\"code\":\"PIN\",\"breed\":\"PINZGAUER\"},{\"code\":\"BAW\",\"breed\":\"BLONDE D'AQU(WHITE)\"},{\"code\":\"BAX\",\"breed\":\"BLONDE D'AQUITAINE X\"},{\"code\":\"SOB\",\"breed\":\"SWISS ORIG BRAUNVIEH\"},{\"code\":\"RO\",\"breed\":\"ROMAGNOLA\"},{\"code\":\"BAZX\",\"breed\":\"BAZADAISE X\"},{\"code\":\"FEX\",\"breed\":\"FRISONA ESPAGNOLA X\"},{\"code\":\"LH\",\"breed\":\"LONGHORN\"},{\"code\":\"VA\",\"breed\":\"VAYNOL\"},{\"code\":\"BR\",\"breed\":\"BRAHMAN\"},{\"code\":\"MALX\",\"breed\":\"MALKEKORTHORN X\"},{\"code\":\"NO\",\"breed\":\"NORMANDE\"},{\"code\":\"PINX\",\"breed\":\"PINZGAUER X\"},{\"code\":\"BU\",\"breed\":\"WATER BUFFALO\"},{\"code\":\"NR\",\"breed\":\"NORWEGIAN RED\"},{\"code\":\"BW\",\"breed\":\"BRITISH WHITE\"},{\"code\":\"BAL\",\"breed\":\"BLUE ALBION\"},{\"code\":\"SGX\",\"breed\":\"SWISS GREY X\"},{\"code\":\"KE\",\"breed\":\"KERRY\"},{\"code\":\"BWX\",\"breed\":\"BRITISH WHITE X\"},{\"code\":\"HIX\",\"breed\":\"HIGHLAND X\"},{\"code\":\"RE\",\"breed\":\"REGGIANA\"},{\"code\":\"OO\",\"breed\":\"OTHER BREEDS\"},{\"code\":\"LIMR\",\"breed\":\"LIMOUSIN (RED)\"},{\"code\":\"GAY\",\"breed\":\"GAYAL\"},{\"code\":\"BI\",\"breed\":\"BISON\"},{\"code\":\"PAX\",\"breed\":\"PARTHENAIS X\"},{\"code\":\"HLX\",\"breed\":\"HIGHLAND X\"},{\"code\":\"WGX\",\"breed\":\"WHITE GALLOWAY X\"},{\"code\":\"BG X\",\"breed\":\"BELTED GALLOWAY X\"},{\"code\":\"LIMX\",\"breed\":\"LIMOUSIN X\"},{\"code\":\"BAB\",\"breed\":\"BLONDE D'AQU(BLACK)\"},{\"code\":\"ZE\",\"breed\":\"ZEBU\"},{\"code\":\"RP\",\"breed\":\"RED POLL\"},{\"code\":\"JE\",\"breed\":\"JERSEY\"},{\"code\":\"STX\",\"breed\":\"STABILISER X\"},{\"code\":\"WP\",\"breed\":\"WHITE PARK\"},{\"code\":\"MA\",\"breed\":\"MAINE ANJOU\"},{\"code\":\"MAL\",\"breed\":\"MALKEKORTHORN\"},{\"code\":\"LM\",\"breed\":\"LIMOUSIN\"},{\"code\":\"HEBL\",\"breed\":\"HEREFORD (BLACK)\"},{\"code\":\"NS\",\"breed\":\"NOT SUPPLIED\"},{\"code\":\"TTX\",\"breed\":\"TARANTAISE-TARINA X\"},{\"code\":\"GAS\",\"breed\":\"GASCONNE\"},{\"code\":\"SHO\",\"breed\":\"SHORTHORN\"},{\"code\":\"AM\",\"breed\":\"ARMORICAINE\"},{\"code\":\"BWB\",\"breed\":\"BELTED WELSH BLACK\"},{\"code\":\"ROX\",\"breed\":\"ROMAGNOLA X\"},{\"code\":\"BABX\",\"breed\":\"BLONDE D'AQU(BLACK)X\"},{\"code\":\"LU\",\"breed\":\"LUING\"},{\"code\":\"BAR\",\"breed\":\"BLONDE D'AQU (RED)\"},{\"code\":\"AR\",\"breed\":\"ANGLER ROTVIEH\"},{\"code\":\"SRWX\",\"breed\":\"SWEDISH RED&WHITE X\"},{\"code\":\"MARX\",\"breed\":\"MARCHIGIANA X\"},{\"code\":\"SA\",\"breed\":\"SALERS\"},{\"code\":\"YK\",\"breed\":\"YAK\"},{\"code\":\"SHX\",\"breed\":\"SHETLAND X\"},{\"code\":\"ROTX\",\"breed\":\"ROTEBUNDE X\"},{\"code\":\"ARX\",\"breed\":\"ANGLER ROTVIEH X\"},{\"code\":\"BAZ\",\"breed\":\"BAZADAISE\"},{\"code\":\"AYX\",\"breed\":\"AYRSHIRE X\"},{\"code\":\"DS\",\"breed\":\"DAIRY SHORTHORN\"},{\"code\":\"DBX\",\"breed\":\"DANISH BLUE X\"},{\"code\":\"LUX\",\"breed\":\"LUING X\"},{\"code\":\"CH\",\"breed\":\"CHAROLAIS\"},{\"code\":\"REX\",\"breed\":\"REGGIANA X\"},{\"code\":\"TB\",\"breed\":\"TYRONE BLACK\"},{\"code\":\"SM\",\"breed\":\"SIMMENTAL\"},{\"code\":\"BLP\",\"breed\":\"BLACK POLL\"},{\"code\":\"GASX\",\"breed\":\"GASCONNE X\"},{\"code\":\"GEX\",\"breed\":\"GELBVIEH X\"},{\"code\":\"JEX\",\"breed\":\"JERSEY X\"},{\"code\":\"DEXX\",\"breed\":\"DEXTER X\"},{\"code\":\"BLPX\",\"breed\":\"BLACK POLL X\"},{\"code\":\"BARX\",\"breed\":\"BLONDE D'AQU (RED) X\"},{\"code\":\"LIMRX\",\"breed\":\"LIMOUSIN (RED) X\"},{\"code\":\"WB\",\"breed\":\"WELSH BLACK\"},{\"code\":\"HO\",\"breed\":\"HOLSTEIN\"},{\"code\":\"BAZ X\",\"breed\":\"BAZADAISE X\"},{\"code\":\"UNAV\",\"breed\":\"UNAVAILABLE\"},{\"code\":\"ND\",\"breed\":\"NORTH DEVON\"},{\"code\":\"WPX\",\"breed\":\"WHITE PARK X\"},{\"code\":\"KEX\",\"breed\":\"KERRY X\"},{\"code\":\"AMX\",\"breed\":\"ARMORICAINE X\"},{\"code\":\"AU\",\"breed\":\"AUBRAC\"},{\"code\":\"CB\",\"breed\":\"CROSS BREED BEEF\"},{\"code\":\"CON\",\"breed\":\"CONTINENTAL\"},{\"code\":\"CD\",\"breed\":\"CROSS BREED DAIRY\"},{\"code\":\"H\",\"breed\":\"HEREFORD\"},{\"code\":\"WSX\",\"breed\":\"WHITEBRED S/HORN X\"},{\"code\":\"TT\",\"breed\":\"TARANTAISE-TARINA\"},{\"code\":\"GBX\",\"breed\":\"GRONINGER BLAARKOP X\"},{\"code\":\"CONX\",\"breed\":\"CONTINENTAL X\"},{\"code\":\"BS\",\"breed\":\"BROWN SWISS\"},{\"code\":\"EFB\",\"breed\":\"EAST FINNISH BROWN\"},{\"code\":\"WAX\",\"breed\":\"WAGYU CROSS\"},{\"code\":\"AUX\",\"breed\":\"AUBRAC X\"},{\"code\":\"WS\",\"breed\":\"WHITEBRED SHORTHORN\"},{\"code\":\"EP\",\"breed\":\"ENGLISH PARK\"},{\"code\":\"BA\",\"breed\":\"BLONDE D'AQUITAINE\"},{\"code\":\"LHX\",\"breed\":\"LONGHORN X\"},{\"code\":\"PA\",\"breed\":\"PARTHENAIS\"},{\"code\":\"VNX\",\"breed\":\"VALDOSTANA NERA X\"},{\"code\":\"SUX\",\"breed\":\"SUSSEX X\"},{\"code\":\"IMX\",\"breed\":\"IRISH MOILED X\"},{\"code\":\"DEVX\",\"breed\":\"DEVON X\"},{\"code\":\"BG\",\"breed\":\"BELTED GALLOWAY\"},{\"code\":\"WBX\",\"breed\":\"WELSH BLACK X\"},{\"code\":\"DVX\",\"breed\":\"SOUTH DEVON X\"},{\"code\":\"CHL\",\"breed\":\"CHILLINGHAM\"},{\"code\":\"MO\",\"breed\":\"MONTBELIARDE\"},{\"code\":\"SAX\",\"breed\":\"SALERS X\"},{\"code\":\"CA\",\"breed\":\"CANADIAN ANGUS\"},{\"code\":\"BALX\",\"breed\":\"BLUE ALBION X\"},{\"code\":\"IM\",\"breed\":\"IRISH MOILED\"},{\"code\":\"LIMB\",\"breed\":\"LIMOUSIN (BLACK)\"},{\"code\":\"DRX\",\"breed\":\"DANISH RED X\"},{\"code\":\"HEBLX\",\"breed\":\"HEREFORD (BLACK) X\"},{\"code\":\"BP\",\"breed\":\"BRETONNE PIE-NOIRE\"},{\"code\":\"SH\",\"breed\":\"SHETLAND\"},{\"code\":\"SDX\",\"breed\":\"SOUTH DEVON X\"},{\"code\":\"SRW\",\"breed\":\"SWEDISH RED & WHITE\"},{\"code\":\"OEX\",\"breed\":\"OLD ENGLISH X\"},{\"code\":\"BWBX\",\"breed\":\"BELTED WELSH BLACK X\"},{\"code\":\"DEV\",\"breed\":\"DEVON\"},{\"code\":\"FE\",\"breed\":\"FRISONA ESPAGNOLA\"},{\"code\":\"GUX\",\"breed\":\"GUERNSEY X\"},{\"code\":\"BX\",\"breed\":\"BEEF X\"},{\"code\":\"MG\",\"breed\":\"MURRAY GREY\"},{\"code\":\"DE\",\"breed\":\"DEXTER\"},{\"code\":\"WW\",\"breed\":\"WELSH WHITE\"},{\"code\":\"BGX\",\"breed\":\"BELTED GALLOWAY X\"},{\"code\":\"DG\",\"breed\":\"DUN GALLOWAY\"},{\"code\":\"HEBR\",\"breed\":\"HEREFORD (BROWN)\"},{\"code\":\"ST\",\"breed\":\"STABILISER\"},{\"code\":\"SU\",\"breed\":\"SUSSEX\"},{\"code\":\"HEBRX\",\"breed\":\"HEREFORD (BROWN) X\"},{\"code\":\"HEX\",\"breed\":\"HEREFORD X\"},{\"code\":\"GE\",\"breed\":\"GELBVIEH\"},{\"code\":\"WG\",\"breed\":\"WHITE GALLOWAY\"},{\"code\":\"CHLX\",\"breed\":\"CHILLINGHAM X\"},{\"code\":\"MOX\",\"breed\":\"MONTBELIARDE X\"},{\"code\":\"VAX\",\"breed\":\"VAYNOL X\"},{\"code\":\"BRO\",\"breed\":\"BALTATA ROMANEASCA\"},{\"code\":\"BLG\",\"breed\":\"BLUE GREY\"},{\"code\":\"AY\",\"breed\":\"AYRSHIRE\"},{\"code\":\"BSH\",\"breed\":\"BEEF SHORTHORN\"},{\"code\":\"SMX\",\"breed\":\"SIMMENTAL X\"},{\"code\":\"BFX\",\"breed\":\"BRITISH FRIESIAN X\"},{\"code\":\"WAGYU\",\"breed\":\"WAGYU\"},{\"code\":\"DV\",\"breed\":\"SOUTH DEVON\"},{\"code\":\"JYX\",\"breed\":\"JERSEY X\"},{\"code\":\"BH\",\"breed\":\"BRITISH HOLSTEIN\"},{\"code\":\"BHX\",\"breed\":\"BRITISH HOLSTEIN X\"},{\"code\":\"AAX\",\"breed\":\"ABERDEEN ANGUS X\"},{\"code\":\"HFX\",\"breed\":\"HOLSTEIN FRIESIAN X\"},{\"code\":\"OE\",\"breed\":\"OLD ENGLISH\"},{\"code\":\"CAX\",\"breed\":\"CANADIAN ANGUS X\"},{\"code\":\"DB\",\"breed\":\"DANISH BLUE\"},{\"code\":\"HI\",\"breed\":\"HIGHLAND\"},{\"code\":\"NDX\",\"breed\":\"NORTH DEVON X\"},{\"code\":\"BSHX\",\"breed\":\"BEEF SHORTHORN X\"},{\"code\":\"BPX\",\"breed\":\"BRETONNE PIE-NOIRE X\"},{\"code\":\"EPX\",\"breed\":\"ENGLISH PARK X\"},{\"code\":\"MRI\",\"breed\":\"MEUSE RHINE ISSEL\"},{\"code\":\"AN\",\"breed\":\"ANKOLE\"},{\"code\":\"BLGX\",\"breed\":\"BLUE GREY X\"},{\"code\":\"GB\",\"breed\":\"GRONINGER BLAARKOP\"},{\"code\":\"LMX\",\"breed\":\"LIMOUSIN X\"},{\"code\":\"GAX\",\"breed\":\"GALLOWAY X\"},{\"code\":\"MAX\",\"breed\":\"MAINE ANJOU X\"},{\"code\":\"HERX\",\"breed\":\"HEREFORD (RED) X\"},{\"code\":\"MRIX\",\"breed\":\"MEUSE RHINE ISSEL X\"},{\"code\":\"PI\",\"breed\":\"PIEMONTESE\"},{\"code\":\"FR\",\"breed\":\"FRIESIAN\"},{\"code\":\"HX\",\"breed\":\"HEREFORD X\"},{\"code\":\"RPX\",\"breed\":\"RED POLL X\"},{\"code\":\"BSHO\",\"breed\":\"BEEF SHORTHORN\"},{\"code\":\"SG\",\"breed\":\"SWISS GREY\"},{\"code\":\"LI\",\"breed\":\"LIMOUSIN\"},{\"code\":\"HE\",\"breed\":\"HEREFORD\"},{\"code\":\"DGX\",\"breed\":\"DUN GALLOWAY X\"},{\"code\":\"SBX\",\"breed\":\"SWISS BRAUNVIEH X\"},{\"code\":\"CHX\",\"breed\":\"CHAROLAIS X\"},{\"code\":\"MGX\",\"breed\":\"MURRAY GREY X\"},{\"code\":\"DEX\",\"breed\":\"DEXTER\"},{\"code\":\"ROT\",\"breed\":\"ROTEBUNDE\"},{\"code\":\"GLX\",\"breed\":\"GLOUCESTER X\"},{\"code\":\"LR\",\"breed\":\"LINCOLN RED\"},{\"code\":\"RWFR\",\"breed\":\"RED & WHITE FRIESIAN\"},{\"code\":\"BB\",\"breed\":\"BELGIAN BLUE\"},{\"code\":\"BBX\",\"breed\":\"BELGIAN BLUE X\"},{\"code\":\"JY\",\"breed\":\"JERSEY\"},{\"code\":\"DSHO\",\"breed\":\"DAIRY SHORTHORN\"}]");
      /***/
    },

    /***/
    "2SqX":
    /*!**********************************************!*\
      !*** ./libs/ngrx/src/lib/bullState/index.ts ***!
      \**********************************************/

    /*! exports provided: BullActionTypes, LoadBullsFinished, RetreieveBullData, LoadBulls, AddBull, UpsertBull, AddBulls, UpsertBulls, UpdateBull, UpdateBulls, DeleteBull, DeleteBulls, ClearBulls, BullEffects, bullsFeatureKey, adapter, initialBullState, bullReducer, selectIds, selectEntities, selectAll, selectTotal, selectBulls, selectBullByTag */

    /***/
    function SqX(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _bull_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./bull.actions */
      "/JzY");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "BullActionTypes", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["BullActionTypes"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "LoadBullsFinished", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["LoadBullsFinished"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "RetreieveBullData", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["RetreieveBullData"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "LoadBulls", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["LoadBulls"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "AddBull", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["AddBull"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "UpsertBull", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["UpsertBull"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "AddBulls", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["AddBulls"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "UpsertBulls", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["UpsertBulls"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "UpdateBull", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["UpdateBull"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "UpdateBulls", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["UpdateBulls"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "DeleteBull", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["DeleteBull"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "DeleteBulls", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["DeleteBulls"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "ClearBulls", function () {
        return _bull_actions__WEBPACK_IMPORTED_MODULE_0__["ClearBulls"];
      });
      /* harmony import */


      var _bull_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./bull.effects */
      "68F6");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "BullEffects", function () {
        return _bull_effects__WEBPACK_IMPORTED_MODULE_1__["BullEffects"];
      });
      /* harmony import */


      var _bull_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./bull.reducer */
      "Lpkz");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "bullsFeatureKey", function () {
        return _bull_reducer__WEBPACK_IMPORTED_MODULE_2__["bullsFeatureKey"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "adapter", function () {
        return _bull_reducer__WEBPACK_IMPORTED_MODULE_2__["adapter"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "initialBullState", function () {
        return _bull_reducer__WEBPACK_IMPORTED_MODULE_2__["initialBullState"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "bullReducer", function () {
        return _bull_reducer__WEBPACK_IMPORTED_MODULE_2__["bullReducer"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "selectIds", function () {
        return _bull_reducer__WEBPACK_IMPORTED_MODULE_2__["selectIds"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "selectEntities", function () {
        return _bull_reducer__WEBPACK_IMPORTED_MODULE_2__["selectEntities"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "selectAll", function () {
        return _bull_reducer__WEBPACK_IMPORTED_MODULE_2__["selectAll"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "selectTotal", function () {
        return _bull_reducer__WEBPACK_IMPORTED_MODULE_2__["selectTotal"];
      });
      /* harmony import */


      var _bull_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./bull.selectors */
      "+LV5");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "selectBulls", function () {
        return _bull_selectors__WEBPACK_IMPORTED_MODULE_3__["selectBulls"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "selectBullByTag", function () {
        return _bull_selectors__WEBPACK_IMPORTED_MODULE_3__["selectBullByTag"];
      });
      /***/

    },

    /***/
    "3DJw":
    /*!********************************!*\
      !*** ./libs/services/index.ts ***!
      \********************************/

    /*! exports provided: AnimalBreedService, AnimalUpdateService, CullUpdateService, MappingService, LoadingPaneService, PusherService, ScreenSizeService, WarningService */

    /***/
    function DJw(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _src_animal_breed_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./src/animal-breed.service */
      "Jf04");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "AnimalBreedService", function () {
        return _src_animal_breed_service__WEBPACK_IMPORTED_MODULE_0__["AnimalBreedService"];
      });
      /* harmony import */


      var _src_animal_update_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./src/animal-update.service */
      "tDNK");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "AnimalUpdateService", function () {
        return _src_animal_update_service__WEBPACK_IMPORTED_MODULE_1__["AnimalUpdateService"];
      });
      /* harmony import */


      var _src_cull_update_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./src/cull-update.service */
      "3IdK");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "CullUpdateService", function () {
        return _src_cull_update_service__WEBPACK_IMPORTED_MODULE_2__["CullUpdateService"];
      });
      /* harmony import */


      var _src_importData_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./src/importData.service */
      "ugX8");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "MappingService", function () {
        return _src_importData_service__WEBPACK_IMPORTED_MODULE_3__["MappingService"];
      });
      /* harmony import */


      var _src_loading_pane_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./src/loading-pane.service */
      "4ZGe");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "LoadingPaneService", function () {
        return _src_loading_pane_service__WEBPACK_IMPORTED_MODULE_4__["LoadingPaneService"];
      });
      /* harmony import */


      var _src_pusher_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./src/pusher.service */
      "RwwG");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "PusherService", function () {
        return _src_pusher_service__WEBPACK_IMPORTED_MODULE_5__["PusherService"];
      });
      /* harmony import */


      var _src_screen_size_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./src/screen-size.service */
      "XIdb");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "ScreenSizeService", function () {
        return _src_screen_size_service__WEBPACK_IMPORTED_MODULE_6__["ScreenSizeService"];
      });
      /* harmony import */


      var _src_warning_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./src/warning.service */
      "ry1f");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "WarningService", function () {
        return _src_warning_service__WEBPACK_IMPORTED_MODULE_7__["WarningService"];
      });
      /***/

    },

    /***/
    "3IdK":
    /*!**************************************************!*\
      !*** ./libs/services/src/cull-update.service.ts ***!
      \**************************************************/

    /*! exports provided: CullUpdateService */

    /***/
    function IdK(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CullUpdateService", function () {
        return CullUpdateService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _cms_services_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @cms-services/http */
      "Jj2M");
      /* harmony import */


      var _loading_pane_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./loading-pane.service */
      "4ZGe");

      var CullUpdateService = /*#__PURE__*/function () {
        function CullUpdateService(httpService, loadingService) {
          _classCallCheck(this, CullUpdateService);

          this.httpService = httpService;
          this.loadingService = loadingService;
          this._cullUpdate = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        }

        _createClass(CullUpdateService, [{
          key: "getCullUpdate",
          value: function getCullUpdate() {
            return this._cullUpdate;
          }
        }, {
          key: "convertUpdate",
          value: function convertUpdate(update) {
            var interUpdate = [];
            Object.entries(update).forEach(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              var convertedUpdate = {
                score: value.score ? value.score : null,
                tagNumber: key,
                age: value.age,
                aliveCalves: value.aliveCalves ? value.aliveCalves : null,
                calfDailyWeightGain: value.calfAvgDailyWeightGain ? value.calfAvgDailyWeightGain : null,
                totalCalves: value.calvesCount ? value.calvesCount : 0
              };
              interUpdate.push(convertedUpdate);
            });
            return interUpdate;
          }
        }, {
          key: "cullUpdate",
          set: function set(update) {
            var _this = this;

            if (update !== 'error') {
              this._cullUpdate.next(this.convertUpdate(update));
            } else {
              this.loadingService.setLoadingState(true);
              this.httpService.getCullUpdate().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)).subscribe(function (httpUpdate) {
                _this._cullUpdate.next(_this.convertUpdate(httpUpdate));

                _this.loadingService.setLoadingState(false);
              });
            }
          }
        }]);

        return CullUpdateService;
      }();

      CullUpdateService.ɵfac = function CullUpdateService_Factory(t) {
        return new (t || CullUpdateService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_cms_services_http__WEBPACK_IMPORTED_MODULE_3__["HttpService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_loading_pane_service__WEBPACK_IMPORTED_MODULE_4__["LoadingPaneService"]));
      };

      CullUpdateService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: CullUpdateService,
        factory: CullUpdateService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CullUpdateService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: _cms_services_http__WEBPACK_IMPORTED_MODULE_3__["HttpService"]
          }, {
            type: _loading_pane_service__WEBPACK_IMPORTED_MODULE_4__["LoadingPaneService"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "4ZGe":
    /*!***************************************************!*\
      !*** ./libs/services/src/loading-pane.service.ts ***!
      \***************************************************/

    /*! exports provided: LoadingPaneService */

    /***/
    function ZGe(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LoadingPaneService", function () {
        return LoadingPaneService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      "qCKp");

      var LoadingPaneService = /*#__PURE__*/function () {
        function LoadingPaneService() {
          _classCallCheck(this, LoadingPaneService);

          this._loadingState = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
          this.counter = 0;
        }

        _createClass(LoadingPaneService, [{
          key: "setLoadingState",
          value: function setLoadingState(state) {
            if (state) {
              this.counter++;
            } else {
              this.counter--;
            }

            this._loadingState.next(this.counter > 0);
          }
        }, {
          key: "stopLoading",
          value: function stopLoading() {
            this.counter = 0;

            this._loadingState.next(false);
          }
        }, {
          key: "currentLoadingState",
          get: function get() {
            return this._loadingState;
          }
        }]);

        return LoadingPaneService;
      }();

      LoadingPaneService.ɵfac = function LoadingPaneService_Factory(t) {
        return new (t || LoadingPaneService)();
      };

      LoadingPaneService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: LoadingPaneService,
        factory: LoadingPaneService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoadingPaneService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "68F6":
    /*!*****************************************************!*\
      !*** ./libs/ngrx/src/lib/bullState/bull.effects.ts ***!
      \*****************************************************/

    /*! exports provided: BullEffects */

    /***/
    function F6(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BullEffects", function () {
        return BullEffects;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ngrx_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @ngrx/effects */
      "9jGm");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _bull_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./bull.actions */
      "/JzY");
      /* harmony import */


      var _cms_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @cms-services */
      "3DJw");
      /* harmony import */


      var _cms_services_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @cms-services/http */
      "Jj2M");

      var BullEffects = function BullEffects(actions$, loadingService, httpService) {
        var _this2 = this;

        _classCallCheck(this, BullEffects);

        this.actions$ = actions$;
        this.loadingService = loadingService;
        this.httpService = httpService;
        this.$retrieveBullData = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["createEffect"])(function () {
          return _this2.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["ofType"])(_bull_actions__WEBPACK_IMPORTED_MODULE_3__["BullActionTypes"].RetrieveBulls), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () {
            _this2.loadingService.setLoadingState(true);

            return _this2.httpService.getBullData().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (bulls) {
              return new _bull_actions__WEBPACK_IMPORTED_MODULE_3__["LoadBulls"]({
                bulls: bulls
              });
            }));
          }));
        });
        this.$loadBulls = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["createEffect"])(function () {
          return _this2.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["ofType"])(_bull_actions__WEBPACK_IMPORTED_MODULE_3__["BullActionTypes"].LoadBulls), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function () {
            _this2.loadingService.setLoadingState(false);

            return new _bull_actions__WEBPACK_IMPORTED_MODULE_3__["LoadBullsFinished"]();
          }));
        });
      };

      BullEffects.ɵfac = function BullEffects_Factory(t) {
        return new (t || BullEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["Actions"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_cms_services__WEBPACK_IMPORTED_MODULE_4__["LoadingPaneService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_cms_services_http__WEBPACK_IMPORTED_MODULE_5__["HttpService"]));
      };

      BullEffects.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: BullEffects,
        factory: BullEffects.ɵfac
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BullEffects, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
        }], function () {
          return [{
            type: _ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["Actions"]
          }, {
            type: _cms_services__WEBPACK_IMPORTED_MODULE_4__["LoadingPaneService"]
          }, {
            type: _cms_services_http__WEBPACK_IMPORTED_MODULE_5__["HttpService"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "6D+/":
    /*!*************************************!*\
      !*** ./libs/enums/src/lib/pages.ts ***!
      \*************************************/

    /*! exports provided: PageURLs */

    /***/
    function D(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "PageURLs", function () {
        return PageURLs;
      });

      var PageURLs;

      (function (PageURLs) {
        PageURLs["MainMenu"] = "main-menu";
        PageURLs["Login"] = "login";
        PageURLs["Weight"] = "weight";
        PageURLs["Logout"] = "logout";
        PageURLs["Animals"] = "animals";
        PageURLs["Births"] = "births";
        PageURLs["CullUpdate"] = "performance";
        PageURLs["Registration"] = "registration";
      })(PageURLs || (PageURLs = {}));
      /***/

    },

    /***/
    "AImA":
    /*!***************************************************!*\
      !*** ./libs/interfaces/src/lib/ErrorInterface.ts ***!
      \***************************************************/

    /*! no exports provided */

    /***/
    function AImA(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /***/

    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      });
      /* harmony import */


      var _cms_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @cms-enums */
      "heZn");
      /* harmony import */


      var _auth_config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../auth_config.json */
      "gWCv");

      var _auth_config_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(
      /*! ../../auth_config.json */
      "gWCv", 1); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false,
        auth: {
          domain: _auth_config_json__WEBPACK_IMPORTED_MODULE_1__["domain"],
          clientId: _auth_config_json__WEBPACK_IMPORTED_MODULE_1__["clientId"],
          redirectUri: "https://".concat(window.location.host, "/").concat(_cms_enums__WEBPACK_IMPORTED_MODULE_0__["PageURLs"].Login),
          audience: _auth_config_json__WEBPACK_IMPORTED_MODULE_1__["audience"]
        },
        pusher: {
          key: '2c99d4674e8e6f7e2397',
          cluster: 'eu'
        }
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "DxyW":
    /*!*********************************************************!*\
      !*** ./libs/ngrx/src/lib/animalState/animal.actions.ts ***!
      \*********************************************************/

    /*! exports provided: AnimalActionTypes, LoadAnimalData, AddAnimal, UpdateAnimal, RetrieveAnimalData, LoadAnimalsFinished, UpdateAnimalWeight, AddAnimalWeight, HTTPError */

    /***/
    function DxyW(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AnimalActionTypes", function () {
        return AnimalActionTypes;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LoadAnimalData", function () {
        return LoadAnimalData;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AddAnimal", function () {
        return AddAnimal;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UpdateAnimal", function () {
        return UpdateAnimal;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "RetrieveAnimalData", function () {
        return RetrieveAnimalData;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LoadAnimalsFinished", function () {
        return LoadAnimalsFinished;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UpdateAnimalWeight", function () {
        return UpdateAnimalWeight;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AddAnimalWeight", function () {
        return AddAnimalWeight;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HTTPError", function () {
        return HTTPError;
      });

      var AnimalActionTypes;

      (function (AnimalActionTypes) {
        AnimalActionTypes["LoadAnimalDataType"] = "[Animal] Load Data";
        AnimalActionTypes["RetrieveAnimalDataType"] = "[Animal] Retrieve Data";
        AnimalActionTypes["LoadAnimalsFinishedType"] = "[Animal] Load Finished";
        AnimalActionTypes["UpdateAnimalWeightType"] = "[Animal] Update Weight or Date";
        AnimalActionTypes["AddAnimalWeightType"] = "[Animal] Add Weight";
        AnimalActionTypes["AddAnimalType"] = "[Animal] Add Animal";
        AnimalActionTypes["UpdateAnimalType"] = "[Animal] Update Animal";
        AnimalActionTypes["HTTPErrorType"] = "[HTTP] Error";
      })(AnimalActionTypes || (AnimalActionTypes = {}));

      var LoadAnimalData = function LoadAnimalData(payload) {
        _classCallCheck(this, LoadAnimalData);

        this.payload = payload;
        this.type = AnimalActionTypes.LoadAnimalDataType;
      };

      var AddAnimal = function AddAnimal(payload) {
        _classCallCheck(this, AddAnimal);

        this.payload = payload;
        this.type = AnimalActionTypes.AddAnimalType;
      };

      var UpdateAnimal = function UpdateAnimal(payload) {
        _classCallCheck(this, UpdateAnimal);

        this.payload = payload;
        this.type = AnimalActionTypes.UpdateAnimalType;
      };

      var RetrieveAnimalData = function RetrieveAnimalData() {
        _classCallCheck(this, RetrieveAnimalData);

        this.type = AnimalActionTypes.RetrieveAnimalDataType;
      };

      var LoadAnimalsFinished = function LoadAnimalsFinished() {
        _classCallCheck(this, LoadAnimalsFinished);

        this.type = AnimalActionTypes.LoadAnimalsFinishedType;
      };

      var UpdateAnimalWeight = function UpdateAnimalWeight(payload) {
        _classCallCheck(this, UpdateAnimalWeight);

        this.payload = payload;
        this.type = AnimalActionTypes.UpdateAnimalWeightType;
      };

      var AddAnimalWeight = function AddAnimalWeight(payload) {
        _classCallCheck(this, AddAnimalWeight);

        this.payload = payload;
        this.type = AnimalActionTypes.AddAnimalWeightType;
      };

      var HTTPError = function HTTPError(payload) {
        _classCallCheck(this, HTTPError);

        this.payload = payload;
        this.type = AnimalActionTypes.HTTPErrorType;
      };
      /***/

    },

    /***/
    "FzOR":
    /*!***********************************************************!*\
      !*** ./libs/ngrx/src/lib/animalState/animal.selectors.ts ***!
      \***********************************************************/

    /*! exports provided: selectAnimals, getAnimalByTag, getDams, getMaleOver36Months, getCalves, getUnregisteredCalves */

    /***/
    function FzOR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectAnimals", function () {
        return selectAnimals;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getAnimalByTag", function () {
        return getAnimalByTag;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getDams", function () {
        return getDams;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getMaleOver36Months", function () {
        return getMaleOver36Months;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getCalves", function () {
        return getCalves;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getUnregisteredCalves", function () {
        return getUnregisteredCalves;
      });
      /* harmony import */


      var _cms_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @cms-enums */
      "heZn");
      /* harmony import */


      var _cms_interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @cms-interfaces */
      "wGq0");
      /* harmony import */


      var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ngrx/store */
      "l7P3");
      /* harmony import */


      var _animals_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./animals.reducer */
      "rQJC");

      var selectAnimals = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(_animals_reducer__WEBPACK_IMPORTED_MODULE_3__["selectAll"], function (animals) {
        return animals.filter(function (animal) {
          return animal.tagNumber !== 'UK000000000000';
        });
      });
      var getAnimalByTag = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(selectAnimals, function (animals, props) {
        return animals.find(function (animal) {
          return animal.tagNumber === props.tagNumber;
        });
      });
      var getDams = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(selectAnimals, function (animals) {
        return animals.filter(function (animal) {
          return animal.gender === _cms_enums__WEBPACK_IMPORTED_MODULE_0__["Gender"].Female && (Object(_cms_interfaces__WEBPACK_IMPORTED_MODULE_1__["age"])(animal.birthDate) > 2 || animal.dam.tagNumber == 'UK000000000000');
        });
      });
      var getMaleOver36Months = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(selectAnimals, function (animals) {
        return animals.filter(function (animal) {
          return animal.gender === _cms_enums__WEBPACK_IMPORTED_MODULE_0__["Gender"].Male && Object(_cms_interfaces__WEBPACK_IMPORTED_MODULE_1__["age"])(animal.birthDate, 'months') > 36 && animal.weightData.findIndex(function (weight) {
            return weight.weightType.isSale;
          }) == -1;
        });
      });
      var getCalves = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(selectAnimals, function (animals, props) {
        return animals.filter(function (animal) {
          return animal.dam.tagNumber === props.tagNumber;
        });
      });
      var getUnregisteredCalves = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["createSelector"])(selectAnimals, function (animals) {
        return animals.filter(function (animal) {
          return !animal.registered;
        });
      });
      /***/
    },

    /***/
    "ISwn":
    /*!*******************************************!*\
      !*** ./libs/enums/src/lib/animal-enum.ts ***!
      \*******************************************/

    /*! exports provided: Gender, CalvingAssistance, AssistanceReason */

    /***/
    function ISwn(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Gender", function () {
        return Gender;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CalvingAssistance", function () {
        return CalvingAssistance;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AssistanceReason", function () {
        return AssistanceReason;
      });

      var Gender;

      (function (Gender) {
        Gender["Male"] = "M";
        Gender["Female"] = "F";
      })(Gender || (Gender = {}));

      var CalvingAssistance;

      (function (CalvingAssistance) {
        CalvingAssistance["None"] = "assistanceNone";
        CalvingAssistance["Required"] = "assistance";
        CalvingAssistance["Vet"] = "vet";
      })(CalvingAssistance || (CalvingAssistance = {}));

      var AssistanceReason;

      (function (AssistanceReason) {
        AssistanceReason["BigCalf"] = "bigCalf";
        AssistanceReason["PoorPresentation"] = "poorPresentation";
        AssistanceReason["NA"] = "na";
      })(AssistanceReason || (AssistanceReason = {}));
      /***/

    },

    /***/
    "Jf04":
    /*!***************************************************!*\
      !*** ./libs/services/src/animal-breed.service.ts ***!
      \***************************************************/

    /*! exports provided: AnimalBreedService */

    /***/
    function Jf04(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AnimalBreedService", function () {
        return AnimalBreedService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _src_assets_cattleBreedCodes_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../src/assets/cattleBreedCodes.json */
      "08Dv");

      var _src_assets_cattleBreedCodes_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(
      /*! ../../../src/assets/cattleBreedCodes.json */
      "08Dv", 1);

      var AnimalBreedService = /*#__PURE__*/function () {
        function AnimalBreedService() {
          var _this3 = this;

          _classCallCheck(this, AnimalBreedService);

          this._breedMap = new Map();
          this._breedObjectList = [];
          var breeds = _src_assets_cattleBreedCodes_json__WEBPACK_IMPORTED_MODULE_1__;

          for (var breed in breeds) {
            this._breedMap.set(breeds[breed].code, breeds[breed].breed + ' ');
          }

          this._breedMap.forEach(function (value, key) {
            _this3._breedObjectList.push({
              breed: value.trim(),
              code: key
            });
          });
        }

        _createClass(AnimalBreedService, [{
          key: "getBreedFromCode",
          value: function getBreedFromCode(breed) {
            return this._breedMap.get(breed);
          }
        }, {
          key: "getCodeFromBreed",
          value: function getCodeFromBreed(searchBreed) {
            return this.breedCodes[this.breeds.findIndex(function (breed) {
              return breed.trim() === searchBreed.toUpperCase().trim();
            })];
          }
        }, {
          key: "breedExists",
          value: function breedExists(breedCodeOrName) {
            var codeOrNameUpper = breedCodeOrName === null || breedCodeOrName === void 0 ? void 0 : breedCodeOrName.toString().toUpperCase().trim();
            return this.getBreedFromCode(codeOrNameUpper) !== undefined || this.breeds.findIndex(function (breed) {
              return breed === codeOrNameUpper;
            }) !== -1;
          }
        }, {
          key: "getBreedCode",
          value: function getBreedCode(breed) {
            if (this.getBreedFromCode(breed.trim()) !== undefined) {
              return breed;
            } else {
              return this.getCodeFromBreed(breed.trim());
            }
          }
        }, {
          key: "isBreedCode",
          value: function isBreedCode(breed) {
            return this._breedMap.get(breed) !== undefined;
          }
        }, {
          key: "breedCodes",
          get: function get() {
            return Array.from(this._breedMap.keys());
          }
        }, {
          key: "breeds",
          get: function get() {
            return Array.from(this._breedMap.values()).map(function (breed) {
              return breed.trim();
            });
          }
        }, {
          key: "breedCodeObjects",
          get: function get() {
            return this._breedObjectList;
          }
        }]);

        return AnimalBreedService;
      }();

      AnimalBreedService.ɵfac = function AnimalBreedService_Factory(t) {
        return new (t || AnimalBreedService)();
      };

      AnimalBreedService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: AnimalBreedService,
        factory: AnimalBreedService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AnimalBreedService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "Jj2M":
    /*!************************************!*\
      !*** ./libs/httpServices/index.ts ***!
      \************************************/

    /*! exports provided: HttpService, HttpServicesModule */

    /***/
    function Jj2M(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _src_http_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./src/http.service */
      "m0rx");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "HttpService", function () {
        return _src_http_service__WEBPACK_IMPORTED_MODULE_0__["HttpService"];
      });
      /* harmony import */


      var _src_httpServices_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./src/httpServices.module */
      "SLTg");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "HttpServicesModule", function () {
        return _src_httpServices_module__WEBPACK_IMPORTED_MODULE_1__["HttpServicesModule"];
      });
      /***/

    },

    /***/
    "LmEr":
    /*!*******************************************************!*\
      !*** ./src/app/components/footer/footer.component.ts ***!
      \*******************************************************/

    /*! exports provided: FooterComponent */

    /***/
    function LmEr(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FooterComponent", function () {
        return FooterComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var FooterComponent = function FooterComponent() {
        _classCallCheck(this, FooterComponent);
      };

      FooterComponent.ɵfac = function FooterComponent_Factory(t) {
        return new (t || FooterComponent)();
      };

      FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: FooterComponent,
        selectors: [["cms-footer"]],
        decls: 4,
        vars: 0,
        consts: [[1, "footer", "mt-auto", "py-3"], [1, "container"]],
        template: function FooterComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "footer", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "cite");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Cow loading spinner by parkjisun from the Noun Project");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuY3NzIn0= */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FooterComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'cms-footer',
            templateUrl: './footer.component.html',
            styleUrls: ['./footer.component.css']
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "Lpkz":
    /*!*****************************************************!*\
      !*** ./libs/ngrx/src/lib/bullState/bull.reducer.ts ***!
      \*****************************************************/

    /*! exports provided: bullsFeatureKey, adapter, initialBullState, bullReducer, selectIds, selectEntities, selectAll, selectTotal */

    /***/
    function Lpkz(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "bullsFeatureKey", function () {
        return bullsFeatureKey;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "adapter", function () {
        return adapter;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "initialBullState", function () {
        return initialBullState;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "bullReducer", function () {
        return bullReducer;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectIds", function () {
        return selectIds;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectEntities", function () {
        return selectEntities;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectAll", function () {
        return selectAll;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectTotal", function () {
        return selectTotal;
      });
      /* harmony import */


      var _ngrx_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @ngrx/entity */
      "R0sL");
      /* harmony import */


      var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @ngrx/store */
      "l7P3");
      /* harmony import */


      var _bull_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./bull.actions */
      "/JzY");

      var bullsFeatureKey = 'bull';
      var adapter = Object(_ngrx_entity__WEBPACK_IMPORTED_MODULE_0__["createEntityAdapter"])({
        selectId: function selectId(bull) {
          return bull.tagNumber;
        }
      });
      var initialBullState = adapter.getInitialState({// additional entity state properties
      });

      function bullReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialBullState;
        var action = arguments.length > 1 ? arguments[1] : undefined;

        switch (action.type) {
          case _bull_actions__WEBPACK_IMPORTED_MODULE_2__["BullActionTypes"].AddBull:
            {
              return adapter.addOne(action.payload.bull, state);
            }

          case _bull_actions__WEBPACK_IMPORTED_MODULE_2__["BullActionTypes"].UpsertBull:
            {
              return adapter.upsertOne(action.payload.bull, state);
            }

          case _bull_actions__WEBPACK_IMPORTED_MODULE_2__["BullActionTypes"].AddBulls:
            {
              return adapter.addMany(action.payload.bulls, state);
            }

          case _bull_actions__WEBPACK_IMPORTED_MODULE_2__["BullActionTypes"].UpsertBulls:
            {
              return adapter.upsertMany(action.payload.bulls, state);
            }

          case _bull_actions__WEBPACK_IMPORTED_MODULE_2__["BullActionTypes"].UpdateBull:
            {
              return adapter.updateOne(action.payload.bull, state);
            }

          case _bull_actions__WEBPACK_IMPORTED_MODULE_2__["BullActionTypes"].UpdateBulls:
            {
              return adapter.updateMany(action.payload.bulls, state);
            }

          case _bull_actions__WEBPACK_IMPORTED_MODULE_2__["BullActionTypes"].DeleteBull:
            {
              return adapter.removeOne(action.payload.id, state);
            }

          case _bull_actions__WEBPACK_IMPORTED_MODULE_2__["BullActionTypes"].DeleteBulls:
            {
              return adapter.removeMany(action.payload.ids, state);
            }

          case _bull_actions__WEBPACK_IMPORTED_MODULE_2__["BullActionTypes"].LoadBulls:
            {
              return adapter.setAll(action.payload.bulls, state);
            }

          case _bull_actions__WEBPACK_IMPORTED_MODULE_2__["BullActionTypes"].ClearBulls:
            {
              return adapter.removeAll(state);
            }

          default:
            {
              return state;
            }
        }
      }

      var getBullState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createFeatureSelector"])(bullsFeatureKey);

      var _adapter$getSelectors = adapter.getSelectors(getBullState),
          selectIds = _adapter$getSelectors.selectIds,
          selectEntities = _adapter$getSelectors.selectEntities,
          selectAll = _adapter$getSelectors.selectAll,
          selectTotal = _adapter$getSelectors.selectTotal;
      /***/

    },

    /***/
    "N5gg":
    /*!*********************************************************************!*\
      !*** ./src/app/components/loading-modal/loading-modal.component.ts ***!
      \*********************************************************************/

    /*! exports provided: LoadingModalComponent */

    /***/
    function N5gg(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LoadingModalComponent", function () {
        return LoadingModalComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var ngx_smart_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ngx-smart-modal */
      "bqtT");

      var LoadingModalComponent = function LoadingModalComponent() {
        _classCallCheck(this, LoadingModalComponent);
      };

      LoadingModalComponent.ɵfac = function LoadingModalComponent_Factory(t) {
        return new (t || LoadingModalComponent)();
      };

      LoadingModalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: LoadingModalComponent,
        selectors: [["cms-loading-modal"]],
        decls: 3,
        vars: 4,
        consts: [["identifier", "loadingModal", 1, "loading", 3, "closable", "escapable", "dismissable", "customClass"], ["loadingModal", ""], ["src", "assets/cowLoading.svg", "alt", "LoadingIcon", 1, "loading-spinner"]],
        template: function LoadingModalComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ngx-smart-modal", 0, 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("closable", false)("escapable", false)("dismissable", false)("customClass", "nsm-centered");
          }
        },
        directives: [ngx_smart_modal__WEBPACK_IMPORTED_MODULE_1__["NgxSmartModalComponent"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9hZGluZy1tb2RhbC9sb2FkaW5nLW1vZGFsLmNvbXBvbmVudC5jc3MifQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoadingModalComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'cms-loading-modal',
            templateUrl: './loading-modal.component.html',
            styleUrls: ['./loading-modal.component.css']
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "OdQ4":
    /*!*********************************************************!*\
      !*** ./libs/ngrx/src/lib/animalState/animal.effects.ts ***!
      \*********************************************************/

    /*! exports provided: AnimalEffects */

    /***/
    function OdQ4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AnimalEffects", function () {
        return AnimalEffects;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ngrx_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @ngrx/effects */
      "9jGm");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _animal_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./animal.actions */
      "DxyW");
      /* harmony import */


      var _cms_services_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @cms-services/http */
      "Jj2M");
      /* harmony import */


      var _services_src_loading_pane_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../../services/src/loading-pane.service */
      "4ZGe");

      var AnimalEffects = function AnimalEffects(actions$, httpService, loadingPaneService) {
        var _this4 = this;

        _classCallCheck(this, AnimalEffects);

        this.actions$ = actions$;
        this.httpService = httpService;
        this.loadingPaneService = loadingPaneService;
        this.$retrieveAnimalData = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["createEffect"])(function () {
          return _this4.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["ofType"])(_animal_actions__WEBPACK_IMPORTED_MODULE_4__["AnimalActionTypes"].RetrieveAnimalDataType), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function () {
            _this4.loadingPaneService.setLoadingState(true);

            return _this4.httpService.getAnimalData().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (animals) {
              return new _animal_actions__WEBPACK_IMPORTED_MODULE_4__["LoadAnimalData"]({
                animals: animals
              });
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
              return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(new _animal_actions__WEBPACK_IMPORTED_MODULE_4__["HTTPError"]({
                error: err
              }));
            }));
          }));
        });
        this.$loadData = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["createEffect"])(function () {
          return _this4.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["ofType"])(_animal_actions__WEBPACK_IMPORTED_MODULE_4__["AnimalActionTypes"].LoadAnimalDataType), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function () {
            _this4.loadingPaneService.setLoadingState(false);

            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(new _animal_actions__WEBPACK_IMPORTED_MODULE_4__["LoadAnimalsFinished"]());
          }));
        });
        this.$httpError = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["createEffect"])(function () {
          return _this4.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["ofType"])(_animal_actions__WEBPACK_IMPORTED_MODULE_4__["AnimalActionTypes"].HTTPErrorType), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (action) {
            _this4.loadingPaneService.stopLoading();

            alert('An error has occured. Please try again later');
            console.error('An error has occured', action.payload);
          }));
        }, {
          dispatch: false
        });
        actions$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (action) {
          return console.error(action);
        }));
      };

      AnimalEffects.ɵfac = function AnimalEffects_Factory(t) {
        return new (t || AnimalEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["Actions"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_cms_services_http__WEBPACK_IMPORTED_MODULE_5__["HttpService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_src_loading_pane_service__WEBPACK_IMPORTED_MODULE_6__["LoadingPaneService"]));
      };

      AnimalEffects.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: AnimalEffects,
        factory: AnimalEffects.ɵfac
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AnimalEffects, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
        }], function () {
          return [{
            type: _ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["Actions"]
          }, {
            type: _cms_services_http__WEBPACK_IMPORTED_MODULE_5__["HttpService"]
          }, {
            type: _services_src_loading_pane_service__WEBPACK_IMPORTED_MODULE_6__["LoadingPaneService"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "RnhZ":
    /*!**************************************************!*\
      !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
      \**************************************************/

    /*! no static exports found */

    /***/
    function RnhZ(module, exports, __webpack_require__) {
      var map = {
        "./af": "K/tc",
        "./af.js": "K/tc",
        "./ar": "jnO4",
        "./ar-dz": "o1bE",
        "./ar-dz.js": "o1bE",
        "./ar-kw": "Qj4J",
        "./ar-kw.js": "Qj4J",
        "./ar-ly": "HP3h",
        "./ar-ly.js": "HP3h",
        "./ar-ma": "CoRJ",
        "./ar-ma.js": "CoRJ",
        "./ar-sa": "gjCT",
        "./ar-sa.js": "gjCT",
        "./ar-tn": "bYM6",
        "./ar-tn.js": "bYM6",
        "./ar.js": "jnO4",
        "./az": "SFxW",
        "./az.js": "SFxW",
        "./be": "H8ED",
        "./be.js": "H8ED",
        "./bg": "hKrs",
        "./bg.js": "hKrs",
        "./bm": "p/rL",
        "./bm.js": "p/rL",
        "./bn": "kEOa",
        "./bn-bd": "loYQ",
        "./bn-bd.js": "loYQ",
        "./bn.js": "kEOa",
        "./bo": "0mo+",
        "./bo.js": "0mo+",
        "./br": "aIdf",
        "./br.js": "aIdf",
        "./bs": "JVSJ",
        "./bs.js": "JVSJ",
        "./ca": "1xZ4",
        "./ca.js": "1xZ4",
        "./cs": "PA2r",
        "./cs.js": "PA2r",
        "./cv": "A+xa",
        "./cv.js": "A+xa",
        "./cy": "l5ep",
        "./cy.js": "l5ep",
        "./da": "DxQv",
        "./da.js": "DxQv",
        "./de": "tGlX",
        "./de-at": "s+uk",
        "./de-at.js": "s+uk",
        "./de-ch": "u3GI",
        "./de-ch.js": "u3GI",
        "./de.js": "tGlX",
        "./dv": "WYrj",
        "./dv.js": "WYrj",
        "./el": "jUeY",
        "./el.js": "jUeY",
        "./en-au": "Dmvi",
        "./en-au.js": "Dmvi",
        "./en-ca": "OIYi",
        "./en-ca.js": "OIYi",
        "./en-gb": "Oaa7",
        "./en-gb.js": "Oaa7",
        "./en-ie": "4dOw",
        "./en-ie.js": "4dOw",
        "./en-il": "czMo",
        "./en-il.js": "czMo",
        "./en-in": "7C5Q",
        "./en-in.js": "7C5Q",
        "./en-nz": "b1Dy",
        "./en-nz.js": "b1Dy",
        "./en-sg": "t+mt",
        "./en-sg.js": "t+mt",
        "./eo": "Zduo",
        "./eo.js": "Zduo",
        "./es": "iYuL",
        "./es-do": "CjzT",
        "./es-do.js": "CjzT",
        "./es-mx": "tbfe",
        "./es-mx.js": "tbfe",
        "./es-us": "Vclq",
        "./es-us.js": "Vclq",
        "./es.js": "iYuL",
        "./et": "7BjC",
        "./et.js": "7BjC",
        "./eu": "D/JM",
        "./eu.js": "D/JM",
        "./fa": "jfSC",
        "./fa.js": "jfSC",
        "./fi": "gekB",
        "./fi.js": "gekB",
        "./fil": "1ppg",
        "./fil.js": "1ppg",
        "./fo": "ByF4",
        "./fo.js": "ByF4",
        "./fr": "nyYc",
        "./fr-ca": "2fjn",
        "./fr-ca.js": "2fjn",
        "./fr-ch": "Dkky",
        "./fr-ch.js": "Dkky",
        "./fr.js": "nyYc",
        "./fy": "cRix",
        "./fy.js": "cRix",
        "./ga": "USCx",
        "./ga.js": "USCx",
        "./gd": "9rRi",
        "./gd.js": "9rRi",
        "./gl": "iEDd",
        "./gl.js": "iEDd",
        "./gom-deva": "qvJo",
        "./gom-deva.js": "qvJo",
        "./gom-latn": "DKr+",
        "./gom-latn.js": "DKr+",
        "./gu": "4MV3",
        "./gu.js": "4MV3",
        "./he": "x6pH",
        "./he.js": "x6pH",
        "./hi": "3E1r",
        "./hi.js": "3E1r",
        "./hr": "S6ln",
        "./hr.js": "S6ln",
        "./hu": "WxRl",
        "./hu.js": "WxRl",
        "./hy-am": "1rYy",
        "./hy-am.js": "1rYy",
        "./id": "UDhR",
        "./id.js": "UDhR",
        "./is": "BVg3",
        "./is.js": "BVg3",
        "./it": "bpih",
        "./it-ch": "bxKX",
        "./it-ch.js": "bxKX",
        "./it.js": "bpih",
        "./ja": "B55N",
        "./ja.js": "B55N",
        "./jv": "tUCv",
        "./jv.js": "tUCv",
        "./ka": "IBtZ",
        "./ka.js": "IBtZ",
        "./kk": "bXm7",
        "./kk.js": "bXm7",
        "./km": "6B0Y",
        "./km.js": "6B0Y",
        "./kn": "PpIw",
        "./kn.js": "PpIw",
        "./ko": "Ivi+",
        "./ko.js": "Ivi+",
        "./ku": "JCF/",
        "./ku.js": "JCF/",
        "./ky": "lgnt",
        "./ky.js": "lgnt",
        "./lb": "RAwQ",
        "./lb.js": "RAwQ",
        "./lo": "sp3z",
        "./lo.js": "sp3z",
        "./lt": "JvlW",
        "./lt.js": "JvlW",
        "./lv": "uXwI",
        "./lv.js": "uXwI",
        "./me": "KTz0",
        "./me.js": "KTz0",
        "./mi": "aIsn",
        "./mi.js": "aIsn",
        "./mk": "aQkU",
        "./mk.js": "aQkU",
        "./ml": "AvvY",
        "./ml.js": "AvvY",
        "./mn": "lYtQ",
        "./mn.js": "lYtQ",
        "./mr": "Ob0Z",
        "./mr.js": "Ob0Z",
        "./ms": "6+QB",
        "./ms-my": "ZAMP",
        "./ms-my.js": "ZAMP",
        "./ms.js": "6+QB",
        "./mt": "G0Uy",
        "./mt.js": "G0Uy",
        "./my": "honF",
        "./my.js": "honF",
        "./nb": "bOMt",
        "./nb.js": "bOMt",
        "./ne": "OjkT",
        "./ne.js": "OjkT",
        "./nl": "+s0g",
        "./nl-be": "2ykv",
        "./nl-be.js": "2ykv",
        "./nl.js": "+s0g",
        "./nn": "uEye",
        "./nn.js": "uEye",
        "./oc-lnc": "Fnuy",
        "./oc-lnc.js": "Fnuy",
        "./pa-in": "8/+R",
        "./pa-in.js": "8/+R",
        "./pl": "jVdC",
        "./pl.js": "jVdC",
        "./pt": "8mBD",
        "./pt-br": "0tRk",
        "./pt-br.js": "0tRk",
        "./pt.js": "8mBD",
        "./ro": "lyxo",
        "./ro.js": "lyxo",
        "./ru": "lXzo",
        "./ru.js": "lXzo",
        "./sd": "Z4QM",
        "./sd.js": "Z4QM",
        "./se": "//9w",
        "./se.js": "//9w",
        "./si": "7aV9",
        "./si.js": "7aV9",
        "./sk": "e+ae",
        "./sk.js": "e+ae",
        "./sl": "gVVK",
        "./sl.js": "gVVK",
        "./sq": "yPMs",
        "./sq.js": "yPMs",
        "./sr": "zx6S",
        "./sr-cyrl": "E+lV",
        "./sr-cyrl.js": "E+lV",
        "./sr.js": "zx6S",
        "./ss": "Ur1D",
        "./ss.js": "Ur1D",
        "./sv": "X709",
        "./sv.js": "X709",
        "./sw": "dNwA",
        "./sw.js": "dNwA",
        "./ta": "PeUW",
        "./ta.js": "PeUW",
        "./te": "XLvN",
        "./te.js": "XLvN",
        "./tet": "V2x9",
        "./tet.js": "V2x9",
        "./tg": "Oxv6",
        "./tg.js": "Oxv6",
        "./th": "EOgW",
        "./th.js": "EOgW",
        "./tk": "Wv91",
        "./tk.js": "Wv91",
        "./tl-ph": "Dzi0",
        "./tl-ph.js": "Dzi0",
        "./tlh": "z3Vd",
        "./tlh.js": "z3Vd",
        "./tr": "DoHr",
        "./tr.js": "DoHr",
        "./tzl": "z1FC",
        "./tzl.js": "z1FC",
        "./tzm": "wQk9",
        "./tzm-latn": "tT3J",
        "./tzm-latn.js": "tT3J",
        "./tzm.js": "wQk9",
        "./ug-cn": "YRex",
        "./ug-cn.js": "YRex",
        "./uk": "raLr",
        "./uk.js": "raLr",
        "./ur": "UpQW",
        "./ur.js": "UpQW",
        "./uz": "Loxo",
        "./uz-latn": "AQ68",
        "./uz-latn.js": "AQ68",
        "./uz.js": "Loxo",
        "./vi": "KSF8",
        "./vi.js": "KSF8",
        "./x-pseudo": "/X5v",
        "./x-pseudo.js": "/X5v",
        "./yo": "fzPg",
        "./yo.js": "fzPg",
        "./zh-cn": "XDpg",
        "./zh-cn.js": "XDpg",
        "./zh-hk": "SatO",
        "./zh-hk.js": "SatO",
        "./zh-mo": "OmwH",
        "./zh-mo.js": "OmwH",
        "./zh-tw": "kOpN",
        "./zh-tw.js": "kOpN"
      };

      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }

      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        }

        return map[req];
      }

      webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map);
      };

      webpackContext.resolve = webpackContextResolve;
      module.exports = webpackContext;
      webpackContext.id = "RnhZ";
      /***/
    },

    /***/
    "Rscr":
    /*!**************************************!*\
      !*** ./libs/enums/src/lib/modals.ts ***!
      \**************************************/

    /*! exports provided: Modals */

    /***/
    function Rscr(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Modals", function () {
        return Modals;
      });

      var Modals;

      (function (Modals) {
        Modals["Weight"] = "weightModal";
        Modals["Animal"] = "animalModal";
        Modals["Warning"] = "warningModal";
        Modals["Birth"] = "birthModal";
        Modals["CalvingStats"] = "calvingStats";
        Modals["Loading"] = "loadingModal";
      })(Modals || (Modals = {}));
      /***/

    },

    /***/
    "RwwG":
    /*!*********************************************!*\
      !*** ./libs/services/src/pusher.service.ts ***!
      \*********************************************/

    /*! exports provided: PusherService */

    /***/
    function RwwG(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "PusherService", function () {
        return PusherService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var pusher_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! pusher-js */
      "eC5B");
      /* harmony import */


      var pusher_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pusher_js__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var _src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../src/environments/environment */
      "AytR");

      var PusherService = /*#__PURE__*/function () {
        function PusherService() {
          _classCallCheck(this, PusherService);

          this._pusher = new pusher_js__WEBPACK_IMPORTED_MODULE_1___default.a(_src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].pusher.key, {
            cluster: _src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].pusher.cluster
          });
          this._channel = this._pusher.subscribe('cull-update');
        }

        _createClass(PusherService, [{
          key: "channel",
          get: function get() {
            return this._channel;
          }
        }]);

        return PusherService;
      }();

      PusherService.ɵfac = function PusherService_Factory(t) {
        return new (t || PusherService)();
      };

      PusherService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: PusherService,
        factory: PusherService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PusherService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "SLTg":
    /*!******************************************************!*\
      !*** ./libs/httpServices/src/httpServices.module.ts ***!
      \******************************************************/

    /*! exports provided: HttpServicesModule */

    /***/
    function SLTg(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HttpServicesModule", function () {
        return HttpServicesModule;
      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var HttpServicesModule = function HttpServicesModule() {
        _classCallCheck(this, HttpServicesModule);
      };

      HttpServicesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: HttpServicesModule
      });
      HttpServicesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        factory: function HttpServicesModule_Factory(t) {
          return new (t || HttpServicesModule)();
        },
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](HttpServicesModule, {
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HttpServicesModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
          args: [{
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _cms_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @cms-enums */
      "heZn");
      /* harmony import */


      var _cms_ngrx_animal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @cms-ngrx/animal */
      "yTl0");
      /* harmony import */


      var _cms_ngrx_bull__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @cms-ngrx/bull */
      "2SqX");
      /* harmony import */


      var libs_enums_src_lib_pusher_channels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! libs/enums/src/lib/pusher-channels */
      "mQLK");
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! moment */
      "wd/R");
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @auth0/auth0-angular */
      "2beD");
      /* harmony import */


      var _cms_services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @cms-services */
      "3DJw");
      /* harmony import */


      var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ngrx/store */
      "l7P3");
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      "1kSV");
      /* harmony import */


      var libs_services_src_pusher_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! libs/services/src/pusher.service */
      "RwwG");
      /* harmony import */


      var ngx_smart_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ngx-smart-modal */
      "bqtT");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _components_loading_modal_loading_modal_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ./components/loading-modal/loading-modal.component */
      "N5gg");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ./components/footer/footer.component */
      "LmEr");

      function AppComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "router-outlet", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "cms-footer", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      var AppComponent = /*#__PURE__*/function () {
        function AppComponent(location, auth, loadingService, store, ngbAlertConfig, screenSizeService, pusherService, cullUpdateService, modalService) {
          _classCallCheck(this, AppComponent);

          this.location = location;
          this.auth = auth;
          this.loadingService = loadingService;
          this.store = store;
          this.ngbAlertConfig = ngbAlertConfig;
          this.screenSizeService = screenSizeService;
          this.pusherService = pusherService;
          this.cullUpdateService = cullUpdateService;
          this.modalService = modalService;
          this.title = 'CMSFrontEnd';
          this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subscription"]();
          this.ngbAlertConfig.dismissible = false;
        }

        _createClass(AppComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this5 = this;

            moment__WEBPACK_IMPORTED_MODULE_5__["locale"]('en-gb');
            this.subs.add(this.auth.isAuthenticated$.subscribe(function (authed) {
              if (authed) {
                //could do something with sessoin storage to stop redownloading data on refresh
                //would need marker to mark session data as old
                _this5.store.dispatch(new _cms_ngrx_animal__WEBPACK_IMPORTED_MODULE_2__["RetrieveAnimalData"]());

                _this5.store.dispatch(new _cms_ngrx_bull__WEBPACK_IMPORTED_MODULE_3__["RetreieveBullData"]());

                _this5.pusherService.channel.bind(libs_enums_src_lib_pusher_channels__WEBPACK_IMPORTED_MODULE_4__["PusherChannels"].CullUpdate, function (data) {
                  _this5.cullUpdateService.cullUpdate = data.animal;
                });
              }
            }));
          }
        }, {
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {
            var _this6 = this;

            var isOpen = false;
            var loadingModal = this.modalService.get(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["Modals"].Loading);
            Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["combineLatest"])([this.auth.isLoading$, this.loadingService.currentLoadingState]).subscribe(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                  authLoading = _ref4[0],
                  dataLoading = _ref4[1];

              if ((dataLoading || authLoading) && _this6.location.href.includes(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["PageURLs"].MainMenu)) {
                if (!isOpen) {
                  loadingModal.layerPosition = _this6.modalService.getHigherIndex();
                  loadingModal.open(true);
                  isOpen = true;
                }
              } else {
                loadingModal.close();
                isOpen = false;
              }
            });
          }
        }, {
          key: "resize",
          value: function resize(event) {
            this.screenSizeService.screenWidth = event.currentTarget.innerWidth;
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.subs.unsubscribe();
          }
        }]);

        return AppComponent;
      }();

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"]('locationObj'), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_7__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_cms_services__WEBPACK_IMPORTED_MODULE_8__["LoadingPaneService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_9__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__["NgbAlertConfig"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_cms_services__WEBPACK_IMPORTED_MODULE_8__["ScreenSizeService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_services_src_pusher_service__WEBPACK_IMPORTED_MODULE_11__["PusherService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_cms_services__WEBPACK_IMPORTED_MODULE_8__["CullUpdateService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_smart_modal__WEBPACK_IMPORTED_MODULE_12__["NgxSmartModalService"]));
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["cms-root"]],
        hostBindings: function AppComponent_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resize", function AppComponent_resize_HostBindingHandler($event) {
              return ctx.resize($event);
            }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
          }
        },
        decls: 3,
        vars: 3,
        consts: [["class", "d-flex flex-column min-vh-100", 4, "ngIf"], ["id", "loadingModal2"], [1, "d-flex", "flex-column", "min-vh-100"], [1, "flex-fill"], [1, "router-outlet"], [1, "mb-0", "align-self-start"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, AppComponent_div_0_Template, 4, 0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "cms-loading-modal", 1);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.auth.isLoading$));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_13__["NgIf"], _components_loading_modal_loading_modal_component__WEBPACK_IMPORTED_MODULE_14__["LoadingModalComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_15__["RouterOutlet"], _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_16__["FooterComponent"]],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_13__["AsyncPipe"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'cms-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
          }]
        }], function () {
          return [{
            type: Location,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
              args: ['locationObj']
            }]
          }, {
            type: _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_7__["AuthService"]
          }, {
            type: _cms_services__WEBPACK_IMPORTED_MODULE_8__["LoadingPaneService"]
          }, {
            type: _ngrx_store__WEBPACK_IMPORTED_MODULE_9__["Store"]
          }, {
            type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__["NgbAlertConfig"]
          }, {
            type: _cms_services__WEBPACK_IMPORTED_MODULE_8__["ScreenSizeService"]
          }, {
            type: libs_services_src_pusher_service__WEBPACK_IMPORTED_MODULE_11__["PusherService"]
          }, {
            type: _cms_services__WEBPACK_IMPORTED_MODULE_8__["CullUpdateService"]
          }, {
            type: ngx_smart_modal__WEBPACK_IMPORTED_MODULE_12__["NgxSmartModalService"]
          }];
        }, {
          resize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['window:resize', ['$event']]
          }]
        });
      })();
      /***/

    },

    /***/
    "UTZ0":
    /*!********************************************!*\
      !*** ./libs/enums/src/lib/enums.module.ts ***!
      \********************************************/

    /*! exports provided: EnumsModule */

    /***/
    function UTZ0(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "EnumsModule", function () {
        return EnumsModule;
      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var EnumsModule = function EnumsModule() {
        _classCallCheck(this, EnumsModule);
      };

      EnumsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: EnumsModule
      });
      EnumsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        factory: function EnumsModule_Factory(t) {
          return new (t || EnumsModule)();
        },
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](EnumsModule, {
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](EnumsModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
          args: [{
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "W3Zi":
    /*!*****************************************************!*\
      !*** ./src/app/components/login/login.component.ts ***!
      \*****************************************************/

    /*! exports provided: LoginComponent */

    /***/
    function W3Zi(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
        return LoginComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _cms_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @cms-enums */
      "heZn");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @auth0/auth0-angular */
      "2beD");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");

      var _c0 = function _c0(a0) {
        return {
          disabled: a0
        };
      };

      var LoginComponent = /*#__PURE__*/function () {
        function LoginComponent(router, authService) {
          _classCallCheck(this, LoginComponent);

          this.router = router;
          this.authService = authService;
          this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subscription"]();
          this.loginDisable = false;
        }

        _createClass(LoginComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this7 = this;

            this.subs.add(this.authService.isAuthenticated$.subscribe(function (authenticated) {
              if (authenticated) {
                _this7.handleSignIn();
              } else {
                _this7.loginDisable = false;
              }
            }));
          }
        }, {
          key: "handleSignIn",
          value: function handleSignIn() {
            this.loginDisable = true;
            this.router.navigate([_cms_enums__WEBPACK_IMPORTED_MODULE_1__["PageURLs"].MainMenu]);
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.subs.unsubscribe();
          }
        }]);

        return LoginComponent;
      }();

      LoginComponent.ɵfac = function LoginComponent_Factory(t) {
        return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_4__["AuthService"]));
      };

      LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: LoginComponent,
        selectors: [["cms-login"]],
        decls: 7,
        vars: 3,
        consts: [[1, "text-center", "form-centre"], [1, "form-signin"], [1, "btn", "btn-lg", "btn-success", "btn-block", 3, "ngClass", "click"]],
        template: function LoginComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Click to Sign in");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "form", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_5_listener() {
              return ctx.handleSignIn();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " Sign in ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, ctx.loginDisable));
          }
        },
        directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgForm"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgClass"]],
        styles: [".form-signin[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  max-width: 330px;\r\n  padding: 15px;\r\n  margin: auto;\r\n}\r\n.form-signin[_ngcontent-%COMP%]   .checkbox[_ngcontent-%COMP%] {\r\n  font-weight: 400;\r\n}\r\n.form-signin[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  box-sizing: border-box;\r\n  height: auto;\r\n  padding: 10px;\r\n  font-size: 16px;\r\n}\r\n.form-signin[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:focus {\r\n  z-index: 2;\r\n}\r\n.form-signin[_ngcontent-%COMP%]   input[type=\"username\"][_ngcontent-%COMP%] {\r\n  margin-bottom: -1px;\r\n  border-bottom-right-radius: 0;\r\n  border-bottom-left-radius: 0;\r\n}\r\n.form-signin[_ngcontent-%COMP%]   input[type=\"password\"][_ngcontent-%COMP%] {\r\n  margin-bottom: 10px;\r\n  border-top-left-radius: 0;\r\n  border-top-right-radius: 0;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2IsWUFBWTtBQUNkO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGFBQWE7RUFDYixlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLG1CQUFtQjtFQUNuQiw2QkFBNkI7RUFDN0IsNEJBQTRCO0FBQzlCO0FBQ0E7RUFDRSxtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLDBCQUEwQjtBQUM1QiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mb3JtLXNpZ25pbiB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiAzMzBweDtcclxuICBwYWRkaW5nOiAxNXB4O1xyXG4gIG1hcmdpbjogYXV0bztcclxufVxyXG4uZm9ybS1zaWduaW4gLmNoZWNrYm94IHtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG59XHJcbi5mb3JtLXNpZ25pbiAuZm9ybS1jb250cm9sIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBoZWlnaHQ6IGF1dG87XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuLmZvcm0tc2lnbmluIC5mb3JtLWNvbnRyb2w6Zm9jdXMge1xyXG4gIHotaW5kZXg6IDI7XHJcbn1cclxuLmZvcm0tc2lnbmluIGlucHV0W3R5cGU9XCJ1c2VybmFtZVwiXSB7XHJcbiAgbWFyZ2luLWJvdHRvbTogLTFweDtcclxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDtcclxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xyXG59XHJcbi5mb3JtLXNpZ25pbiBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0ge1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcclxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMDtcclxufVxyXG4iXX0= */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'cms-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
          }]
        }], function () {
          return [{
            type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
          }, {
            type: _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_4__["AuthService"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "XIdb":
    /*!**************************************************!*\
      !*** ./libs/services/src/screen-size.service.ts ***!
      \**************************************************/

    /*! exports provided: ScreenSizeService */

    /***/
    function XIdb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ScreenSizeService", function () {
        return ScreenSizeService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      "qCKp");

      var ScreenSizeService = /*#__PURE__*/function () {
        function ScreenSizeService() {
          _classCallCheck(this, ScreenSizeService);

          this.smallScreenWidth = 1000;
          this.$_isSmallScreen = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
          this.screenWidth = window.innerWidth;
        }

        _createClass(ScreenSizeService, [{
          key: "isSmallScreenObs",
          value: function isSmallScreenObs() {
            return this.$_isSmallScreen.asObservable();
          }
        }, {
          key: "screenWidth",
          get: function get() {
            return this._screenWidth;
          },
          set: function set(screenWidth) {
            this._screenWidth = screenWidth;

            if (this.$_isSmallScreen.value !== this.isSmallScreen) {
              this.$_isSmallScreen.next(this.isSmallScreen);
            }
          }
        }, {
          key: "isSmallScreen",
          get: function get() {
            return this.screenWidth <= this.smallScreenWidth;
          }
        }]);

        return ScreenSizeService;
      }();

      ScreenSizeService.ɵfac = function ScreenSizeService_Factory(t) {
        return new (t || ScreenSizeService)();
      };

      ScreenSizeService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: ScreenSizeService,
        factory: ScreenSizeService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ScreenSizeService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "Z2Vo":
    /*!*****************************************************!*\
      !*** ./libs/interfaces/src/lib/AnimalInterfaces.ts ***!
      \*****************************************************/

    /*! exports provided: bull, isAnimal, isCow, isBull, age */

    /***/
    function Z2Vo(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "bull", function () {
        return bull;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "isAnimal", function () {
        return isAnimal;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "isCow", function () {
        return isCow;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "isBull", function () {
        return isBull;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "age", function () {
        return age;
      });
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! moment */
      "wd/R");
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

      var bull = {
        tagNumber: 'TAGNUMBER',
        breed: 'DAVE',
        name: 'GARY'
      };

      function isAnimal(animal) {
        return 'tagNumber' in animal;
      }

      function isCow(animal) {
        return 'weightData' in animal;
      }

      function isBull(animal) {
        return 'name' in animal;
      }

      function age(birthDate) {
        var period = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'year';
        return moment__WEBPACK_IMPORTED_MODULE_0__().diff(birthDate, period, true);
      }
      /***/

    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @auth0/auth0-angular */
      "2beD");
      /* harmony import */


      var _cms_ngrx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @cms-ngrx */
      "t2ZI");
      /* harmony import */


      var _cms_ngrx_animal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @cms-ngrx/animal */
      "yTl0");
      /* harmony import */


      var _cms_ngrx_bull__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @cms-ngrx/bull */
      "2SqX");
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      "1kSV");
      /* harmony import */


      var _ngrx_effects__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ngrx/effects */
      "9jGm");
      /* harmony import */


      var _ngrx_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ngrx/store */
      "l7P3");
      /* harmony import */


      var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @ngrx/store-devtools */
      "agSv");
      /* harmony import */


      var ngx_smart_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ngx-smart-modal */
      "bqtT");
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! src/environments/environment */
      "AytR");
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ./app-routing.module */
      "vY5A");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! ./components/footer/footer.component */
      "LmEr");
      /* harmony import */


      var _components_loading_modal_loading_modal_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! ./components/loading-modal/loading-modal.component */
      "N5gg");
      /* harmony import */


      var _components_login_login_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! ./components/login/login.component */
      "W3Zi");
      /* harmony import */


      var _components_logout_logout_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! ./components/logout/logout.component */
      "aer8");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_16__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        factory: function AppModule_Factory(t) {
          return new (t || AppModule)();
        },
        providers: [{
          provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HTTP_INTERCEPTORS"],
          useClass: _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_5__["AuthHttpInterceptor"],
          multi: true
        }, {
          provide: 'locationObj',
          useValue: location
        }],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_15__["AppRoutingModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreModule"].forRoot(_cms_ngrx__WEBPACK_IMPORTED_MODULE_6__["reducers"], {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }), _ngrx_effects__WEBPACK_IMPORTED_MODULE_10__["EffectsModule"].forRoot([_cms_ngrx_animal__WEBPACK_IMPORTED_MODULE_7__["AnimalEffects"], _cms_ngrx_bull__WEBPACK_IMPORTED_MODULE_8__["BullEffects"]]), src_environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].production ? [] : _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_12__["StoreDevtoolsModule"].instrument(), _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], ngx_smart_modal__WEBPACK_IMPORTED_MODULE_13__["NgxSmartModalModule"].forRoot(), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbTooltipModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbDropdownModule"], _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_5__["AuthModule"].forRoot(Object.assign(Object.assign({}, src_environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].auth), {
          httpInterceptor: {
            allowedList: ['/api/*']
          }
        }))]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_16__["AppComponent"], _components_login_login_component__WEBPACK_IMPORTED_MODULE_19__["LoginComponent"], _components_logout_logout_component__WEBPACK_IMPORTED_MODULE_20__["LogoutComponent"], _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_17__["FooterComponent"], _components_loading_modal_loading_modal_component__WEBPACK_IMPORTED_MODULE_18__["LoadingModalComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_15__["AppRoutingModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreRootModule"], _ngrx_effects__WEBPACK_IMPORTED_MODULE_10__["EffectsRootModule"], _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_12__["StoreDevtoolsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], ngx_smart_modal__WEBPACK_IMPORTED_MODULE_13__["NgxSmartModalModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbTooltipModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbDropdownModule"], _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_5__["AuthModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](AppModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
          args: [{
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_16__["AppComponent"], _components_login_login_component__WEBPACK_IMPORTED_MODULE_19__["LoginComponent"], _components_logout_logout_component__WEBPACK_IMPORTED_MODULE_20__["LogoutComponent"], _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_17__["FooterComponent"], _components_loading_modal_loading_modal_component__WEBPACK_IMPORTED_MODULE_18__["LoadingModalComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_15__["AppRoutingModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreModule"].forRoot(_cms_ngrx__WEBPACK_IMPORTED_MODULE_6__["reducers"], {
              runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
              }
            }), _ngrx_effects__WEBPACK_IMPORTED_MODULE_10__["EffectsModule"].forRoot([_cms_ngrx_animal__WEBPACK_IMPORTED_MODULE_7__["AnimalEffects"], _cms_ngrx_bull__WEBPACK_IMPORTED_MODULE_8__["BullEffects"]]), src_environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].production ? [] : _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_12__["StoreDevtoolsModule"].instrument(), _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], ngx_smart_modal__WEBPACK_IMPORTED_MODULE_13__["NgxSmartModalModule"].forRoot(), _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbTooltipModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbDropdownModule"], _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_5__["AuthModule"].forRoot(Object.assign(Object.assign({}, src_environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].auth), {
              httpInterceptor: {
                allowedList: ['/api/*']
              }
            }))],
            providers: [{
              provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HTTP_INTERCEPTORS"],
              useClass: _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_5__["AuthHttpInterceptor"],
              multi: true
            }, {
              provide: 'locationObj',
              useValue: location
            }],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_16__["AppComponent"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "aer8":
    /*!*******************************************************!*\
      !*** ./src/app/components/logout/logout.component.ts ***!
      \*******************************************************/

    /*! exports provided: LogoutComponent */

    /***/
    function aer8(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LogoutComponent", function () {
        return LogoutComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var LogoutComponent = function LogoutComponent() {
        _classCallCheck(this, LogoutComponent);
      };

      LogoutComponent.ɵfac = function LogoutComponent_Factory(t) {
        return new (t || LogoutComponent)();
      };

      LogoutComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: LogoutComponent,
        selectors: [["cms-logout"]],
        decls: 2,
        vars: 0,
        template: function LogoutComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "logout works!");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9nb3V0L2xvZ291dC5jb21wb25lbnQuY3NzIn0= */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LogoutComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'cms-logout',
            templateUrl: './logout.component.html',
            styleUrls: ['./logout.component.css']
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "cHV0":
    /*!******************************************************!*\
      !*** ./libs/interfaces/src/lib/interfaces.module.ts ***!
      \******************************************************/

    /*! exports provided: InterfacesModule */

    /***/
    function cHV0(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "InterfacesModule", function () {
        return InterfacesModule;
      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var InterfacesModule = function InterfacesModule() {
        _classCallCheck(this, InterfacesModule);
      };

      InterfacesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: InterfacesModule
      });
      InterfacesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        factory: function InterfacesModule_Factory(t) {
          return new (t || InterfacesModule)();
        },
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](InterfacesModule, {
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](InterfacesModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
          args: [{
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "gWCv":
    /*!**************************!*\
      !*** ./auth_config.json ***!
      \**************************/

    /*! exports provided: domain, clientId, audience, serverUrl, default */

    /***/
    function gWCv(module) {
      module.exports = JSON.parse("{\"domain\":\"cattle-management-system.eu.auth0.com\",\"clientId\":\"HkkCv3GXyrOhjDwK4y7evcP757A22BPS\",\"audience\":\"https://cmsBackend.com\",\"serverUrl\":\"http://cmsbackend.api/\"}");
      /***/
    },

    /***/
    "heZn":
    /*!*********************************!*\
      !*** ./libs/enums/src/index.ts ***!
      \*********************************/

    /*! exports provided: Gender, CalvingAssistance, AssistanceReason, EnumsModule, Modals, PageURLs, HttpUrls, BackendURL, HttpUrlsTest */

    /***/
    function heZn(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _lib_animal_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./lib/animal-enum */
      "ISwn");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "Gender", function () {
        return _lib_animal_enum__WEBPACK_IMPORTED_MODULE_0__["Gender"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "CalvingAssistance", function () {
        return _lib_animal_enum__WEBPACK_IMPORTED_MODULE_0__["CalvingAssistance"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "AssistanceReason", function () {
        return _lib_animal_enum__WEBPACK_IMPORTED_MODULE_0__["AssistanceReason"];
      });
      /* harmony import */


      var _lib_enums_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./lib/enums.module */
      "UTZ0");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "EnumsModule", function () {
        return _lib_enums_module__WEBPACK_IMPORTED_MODULE_1__["EnumsModule"];
      });
      /* harmony import */


      var _lib_modals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./lib/modals */
      "Rscr");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "Modals", function () {
        return _lib_modals__WEBPACK_IMPORTED_MODULE_2__["Modals"];
      });
      /* harmony import */


      var _lib_pages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./lib/pages */
      "6D+/");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "PageURLs", function () {
        return _lib_pages__WEBPACK_IMPORTED_MODULE_3__["PageURLs"];
      });
      /* harmony import */


      var _lib_urls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./lib/urls */
      "nmnJ");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "HttpUrls", function () {
        return _lib_urls__WEBPACK_IMPORTED_MODULE_4__["HttpUrls"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "BackendURL", function () {
        return _lib_urls__WEBPACK_IMPORTED_MODULE_4__["BackendURL"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "HttpUrlsTest", function () {
        return _lib_urls__WEBPACK_IMPORTED_MODULE_4__["HttpUrlsTest"];
      });
      /*
       * Public API Surface of enums
       */

      /***/

    },

    /***/
    "m0rx":
    /*!***********************************************!*\
      !*** ./libs/httpServices/src/http.service.ts ***!
      \***********************************************/

    /*! exports provided: HttpService */

    /***/
    function m0rx(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HttpService", function () {
        return HttpService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _cms_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @cms-enums */
      "heZn");
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! moment */
      "wd/R");
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _services_src_importData_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../services/src/importData.service */
      "ugX8");

      var HttpService = /*#__PURE__*/function () {
        function HttpService(http, mappingService) {
          _classCallCheck(this, HttpService);

          this.http = http;
          this.mappingService = mappingService;
        }

        _createClass(HttpService, [{
          key: "getAnimalData",
          value: function getAnimalData() {
            var _this8 = this;

            return this.http.get(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["HttpUrls"].Animals).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
              return _this8.mappingService.importAnimalData(response);
            }));
          }
        }, {
          key: "getBullData",
          value: function getBullData() {
            var _this9 = this;

            return this.http.get(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["HttpUrls"].Bulls).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
              return _this9.mappingService.convertBulls(response);
            }));
          }
        }, {
          key: "getOfflineData",
          value: function getOfflineData() {
            var _this10 = this;

            return this.http.get(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["HttpUrls"].OfflineAnimals).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
              return _this10.mappingService.importAnimalData(response);
            }));
          }
        }, {
          key: "updateWeight",
          value: function updateWeight(id, update) {
            var _this11 = this;

            return this.http.patch("".concat(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["HttpUrls"].PatchWeight, "/").concat(id), Object.assign({}, update)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) {
              return _this11.mappingService.convertWeightData(Object.values(res));
            }));
          }
        }, {
          key: "addWeight",
          value: function addWeight(animalId, weight) {
            var _this12 = this;

            return this.http.put("".concat(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["HttpUrls"].PutWeight, "/").concat(animalId), Object.assign({}, weight)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) {
              return _this12.mappingService.convertWeightData(Object.values(res));
            }));
          }
        }, {
          key: "addAnimal",
          value: function addAnimal(animal) {
            var _this13 = this;

            var newAnimal = Object.assign(Object.assign({}, animal), {
              dam: animal.damTag ? animal.damTag : animal.dam,
              birthDate: moment__WEBPACK_IMPORTED_MODULE_2__(animal.birthDate).format('yyyy-MM-DD')
            });
            return this.http.post(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["HttpUrls"].Animal, newAnimal).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) {
              return _this13.mappingService.importAnimalData([res])[0];
            }));
          }
        }, {
          key: "updateAnimal",
          value: function updateAnimal(tagNumber, update) {
            var _this14 = this;

            var newUpdate = Object.assign({}, update);

            if (moment__WEBPACK_IMPORTED_MODULE_2__["isMoment"](update.birthDate)) {
              newUpdate.birthDate = update.birthDate.format('YYYY-MM-DD');
            }

            return this.http.patch("".concat(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["HttpUrls"].Animal, "/").concat(tagNumber), Object.assign({}, newUpdate)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) {
              return _this14.mappingService.importAnimalData([res])[0];
            }));
          }
        }, {
          key: "getCullUpdate",
          value: function getCullUpdate() {
            return this.http.get(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["HttpUrls"].CullUpdate);
          }
        }]);

        return HttpService;
      }();

      HttpService.ɵfac = function HttpService_Factory(t) {
        return new (t || HttpService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_src_importData_service__WEBPACK_IMPORTED_MODULE_5__["MappingService"]));
      };

      HttpService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: HttpService,
        factory: HttpService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HttpService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]
          }, {
            type: _services_src_importData_service__WEBPACK_IMPORTED_MODULE_5__["MappingService"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "mQLK":
    /*!***********************************************!*\
      !*** ./libs/enums/src/lib/pusher-channels.ts ***!
      \***********************************************/

    /*! exports provided: PusherChannels */

    /***/
    function mQLK(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "PusherChannels", function () {
        return PusherChannels;
      });

      var PusherChannels;

      (function (PusherChannels) {
        PusherChannels["CullUpdate"] = "cull-update";
      })(PusherChannels || (PusherChannels = {}));
      /***/

    },

    /***/
    "nmnJ":
    /*!************************************!*\
      !*** ./libs/enums/src/lib/urls.ts ***!
      \************************************/

    /*! exports provided: HttpUrls, BackendURL, HttpUrlsTest */

    /***/
    function nmnJ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HttpUrls", function () {
        return HttpUrls;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BackendURL", function () {
        return BackendURL;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HttpUrlsTest", function () {
        return HttpUrlsTest;
      });

      var HttpUrls;

      (function (HttpUrls) {
        HttpUrls["Animals"] = "/api/animals";
        HttpUrls["Bulls"] = "/api/bulls";
        HttpUrls["OfflineAnimals"] = "/assets/data.json";
        HttpUrls["PatchWeight"] = "/api/weight";
        HttpUrls["PutWeight"] = "/api/weight";
        HttpUrls["Animal"] = "/api/animal";
        HttpUrls["AnimalBreeds"] = "/assets/cattleBreedCodes.json";
        HttpUrls["Calf"] = "/api/calf";
        HttpUrls["CullUpdate"] = "/api/cullUpdate";
        HttpUrls["Root"] = "/api/";
      })(HttpUrls || (HttpUrls = {}));

      var BackendURL = 'https://cmsBackend.api/';
      var HttpUrlsTest;

      (function (HttpUrlsTest) {
        HttpUrlsTest["Animals"] = "animals";
        HttpUrlsTest["Bulls"] = "bulls";
        HttpUrlsTest["OfflineAnimals"] = "/assets/data.json";
        HttpUrlsTest["PatchWeight"] = "weight";
        HttpUrlsTest["PutWeight"] = "weight";
        HttpUrlsTest["Animal"] = "animal";
        HttpUrlsTest["AnimalBreeds"] = "/assets/cattleBreedCodes.json";
        HttpUrlsTest["Calf"] = "calf";
        HttpUrlsTest["CullUpdate"] = "cullUpdate";
      })(HttpUrlsTest || (HttpUrlsTest = {}));
      /***/

    },

    /***/
    "npcF":
    /*!***************************************************!*\
      !*** ./libs/interfaces/src/lib/BreedInterface.ts ***!
      \***************************************************/

    /*! no exports provided */

    /***/
    function npcF(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /***/

    },

    /***/
    "rQJC":
    /*!**********************************************************!*\
      !*** ./libs/ngrx/src/lib/animalState/animals.reducer.ts ***!
      \**********************************************************/

    /*! exports provided: animalAdapter, initialAnimalState, animalReducer, selectIds, selectEntities, selectAll, selectTotal */

    /***/
    function rQJC(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "animalAdapter", function () {
        return animalAdapter;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "initialAnimalState", function () {
        return initialAnimalState;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "animalReducer", function () {
        return animalReducer;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectIds", function () {
        return selectIds;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectEntities", function () {
        return selectEntities;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectAll", function () {
        return selectAll;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectTotal", function () {
        return selectTotal;
      });
      /* harmony import */


      var _ngrx_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @ngrx/entity */
      "R0sL");
      /* harmony import */


      var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @ngrx/store */
      "l7P3");
      /* harmony import */


      var _animal_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./animal.actions */
      "DxyW");

      var animalFeatureKey = 'animal';

      function sortByTag(a, b) {
        var tagA = Number.parseInt(a.tagNumber.slice(2));
        var tagB = Number.parseInt(b.tagNumber.slice(2));
        return tagA < tagB ? -1 : tagA > tagB ? 1 : 0;
      }

      var animalAdapter = Object(_ngrx_entity__WEBPACK_IMPORTED_MODULE_0__["createEntityAdapter"])({
        selectId: function selectId(animal) {
          return animal.tagNumber;
        },
        sortComparer: sortByTag
      });
      var initialAnimalState = animalAdapter.getInitialState({});

      function animalReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialAnimalState;
        var action = arguments.length > 1 ? arguments[1] : undefined;

        switch (action.type) {
          case _animal_actions__WEBPACK_IMPORTED_MODULE_2__["AnimalActionTypes"].LoadAnimalDataType:
            {
              return animalAdapter.setAll(action.payload.animals, state);
            }

          case _animal_actions__WEBPACK_IMPORTED_MODULE_2__["AnimalActionTypes"].RetrieveAnimalDataType:
            {
              return state;
            }

          case _animal_actions__WEBPACK_IMPORTED_MODULE_2__["AnimalActionTypes"].UpdateAnimalWeightType:
            {
              return animalAdapter.updateOne(action.payload.weightUpdate, state);
            }

          case _animal_actions__WEBPACK_IMPORTED_MODULE_2__["AnimalActionTypes"].HTTPErrorType:
            {
              return state;
            }

          case _animal_actions__WEBPACK_IMPORTED_MODULE_2__["AnimalActionTypes"].AddAnimalWeightType:
            {
              return animalAdapter.updateOne(action.payload.newWeight, state);
            }

          case _animal_actions__WEBPACK_IMPORTED_MODULE_2__["AnimalActionTypes"].AddAnimalType:
            {
              return animalAdapter.addOne(action.payload.animal, state);
            }

          case _animal_actions__WEBPACK_IMPORTED_MODULE_2__["AnimalActionTypes"].UpdateAnimalType:
            {
              return animalAdapter.updateOne(action.payload, state);
            }

          default:
            {
              return state;
            }
        }
      }

      var getAnimalState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createFeatureSelector"])(animalFeatureKey);

      var _animalAdapter$getSel = animalAdapter.getSelectors(getAnimalState),
          selectIds = _animalAdapter$getSel.selectIds,
          selectEntities = _animalAdapter$getSel.selectEntities,
          selectAll = _animalAdapter$getSel.selectAll,
          selectTotal = _animalAdapter$getSel.selectTotal;
      /***/

    },

    /***/
    "ry1f":
    /*!**********************************************!*\
      !*** ./libs/services/src/warning.service.ts ***!
      \**********************************************/

    /*! exports provided: WarningService */

    /***/
    function ry1f(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "WarningService", function () {
        return WarningService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _cms_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @cms-enums */
      "heZn");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var ngx_smart_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ngx-smart-modal */
      "bqtT");

      var WarningService = /*#__PURE__*/function () {
        function WarningService(modals) {
          _classCallCheck(this, WarningService);

          this.modals = modals;
          this.defaultBodyText = 'Are you sure you want to continue?';
          this.defaultButtonText = 'Continue anyway';
          this.defaultError = {
            body: this.defaultBodyText,
            buttonText: this.defaultButtonText,
            isError: false,
            showCloseButton: true
          };
        }

        _createClass(WarningService, [{
          key: "show",
          value: function show(toast) {
            var animal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var warningModal = this.modals.get(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["Modals"].Warning);
            warningModal.layerPosition = this.modals.getHigherIndex();
            warningModal.setData(Object.assign(Object.assign(Object.assign({}, this.defaultError), toast), {
              animal: animal
            })).open();
            this._result = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
            return this._result;
          }
        }, {
          key: "setResult",
          value: function setResult(result) {
            this._result.next(result);

            this._result.complete();
          }
        }]);

        return WarningService;
      }();

      WarningService.ɵfac = function WarningService_Factory(t) {
        return new (t || WarningService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ngx_smart_modal__WEBPACK_IMPORTED_MODULE_3__["NgxSmartModalService"]));
      };

      WarningService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: WarningService,
        factory: WarningService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WarningService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: ngx_smart_modal__WEBPACK_IMPORTED_MODULE_3__["NgxSmartModalService"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "t2ZI":
    /*!************************************!*\
      !*** ./libs/ngrx/src/lib/index.ts ***!
      \************************************/

    /*! exports provided: reducers, metaReducers */

    /***/
    function t2ZI(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "reducers", function () {
        return reducers;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "metaReducers", function () {
        return metaReducers;
      });
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/environments/environment */
      "AytR");
      /* harmony import */


      var _animalState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./animalState */
      "yTl0");
      /* harmony import */


      var _bullState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./bullState */
      "2SqX");

      var reducers = {
        animal: _animalState__WEBPACK_IMPORTED_MODULE_1__["animalReducer"],
        bull: _bullState__WEBPACK_IMPORTED_MODULE_2__["bullReducer"]
      };
      var metaReducers = !src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].production ? [] : [];
      /***/
    },

    /***/
    "tDNK":
    /*!****************************************************!*\
      !*** ./libs/services/src/animal-update.service.ts ***!
      \****************************************************/

    /*! exports provided: AnimalUpdateService */

    /***/
    function tDNK(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AnimalUpdateService", function () {
        return AnimalUpdateService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _cms_ngrx_animal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @cms-ngrx/animal */
      "yTl0");
      /* harmony import */


      var _cms_services_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @cms-services/http */
      "Jj2M");
      /* harmony import */


      var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ngrx/store */
      "l7P3");

      var AnimalUpdateService = /*#__PURE__*/function () {
        function AnimalUpdateService(httpService, store) {
          _classCallCheck(this, AnimalUpdateService);

          this.httpService = httpService;
          this.store = store;
        }

        _createClass(AnimalUpdateService, [{
          key: "updateAnimalWeight",
          value: function updateAnimalWeight(weightId, weightUpdate, animal) {
            var _this15 = this;

            return new Promise(function (resolve) {
              _this15.httpService.updateWeight(weightId, weightUpdate).subscribe(function (res) {
                _this15.store.dispatch(new _cms_ngrx_animal__WEBPACK_IMPORTED_MODULE_1__["UpdateAnimalWeight"]({
                  weightUpdate: {
                    id: animal.tagNumber,
                    changes: {
                      weightData: res
                    }
                  }
                }));

                resolve(true);
              });
            });
          }
        }, {
          key: "addAnimalWeight",
          value: function addAnimalWeight(animalId, weight) {
            var _this16 = this;

            return new Promise(function (resolve) {
              _this16.httpService.addWeight(animalId, weight).subscribe(function (res) {
                _this16.store.dispatch(new _cms_ngrx_animal__WEBPACK_IMPORTED_MODULE_1__["AddAnimalWeight"]({
                  newWeight: {
                    id: animalId,
                    changes: {
                      weightData: res
                    }
                  }
                }));

                resolve(true);
              });
            });
          }
        }, {
          key: "addAnimal",
          value: function addAnimal(animal) {
            var _this17 = this;

            return new Promise(function (resolve) {
              _this17.httpService.addAnimal(animal).subscribe(function (res) {
                _this17.store.dispatch(new _cms_ngrx_animal__WEBPACK_IMPORTED_MODULE_1__["AddAnimal"]({
                  animal: res
                }));

                resolve(true);
              });
            });
          }
        }, {
          key: "updateAnimal",
          value: function updateAnimal(tagNumber, animal) {
            var _this18 = this;

            return new Promise(function (resolve) {
              _this18.httpService.updateAnimal(tagNumber, animal).subscribe(function (res) {
                _this18.store.dispatch(new _cms_ngrx_animal__WEBPACK_IMPORTED_MODULE_1__["UpdateAnimal"]({
                  id: res.tagNumber,
                  changes: res
                }));

                resolve(true);
              });
            });
          }
        }]);

        return AnimalUpdateService;
      }();

      AnimalUpdateService.ɵfac = function AnimalUpdateService_Factory(t) {
        return new (t || AnimalUpdateService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_cms_services_http__WEBPACK_IMPORTED_MODULE_2__["HttpService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]));
      };

      AnimalUpdateService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: AnimalUpdateService,
        factory: AnimalUpdateService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AnimalUpdateService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: _cms_services_http__WEBPACK_IMPORTED_MODULE_2__["HttpService"]
          }, {
            type: _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "ugX8":
    /*!*************************************************!*\
      !*** ./libs/services/src/importData.service.ts ***!
      \*************************************************/

    /*! exports provided: MappingService */

    /***/
    function ugX8(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MappingService", function () {
        return MappingService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _cms_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @cms-enums */
      "heZn");
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! moment */
      "wd/R");
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);

      var MappingService = /*#__PURE__*/function () {
        function MappingService() {
          _classCallCheck(this, MappingService);
        }

        _createClass(MappingService, [{
          key: "importAnimalData",
          value: function importAnimalData(animalData) {
            var mappedAnimals = [];

            for (var _i2 = 0, _Object$values = Object.values(animalData); _i2 < _Object$values.length; _i2++) {
              var value = _Object$values[_i2];
              mappedAnimals.push({
                tagNumber: value.tag_number,
                managementTag: value.management_tag,
                gender: value.sex,
                ai: value.ai_history.length === 0 ? [] : this.convertAiHistory(value.ai_history),
                birthDate: this.convertDate(value.birth_date),
                calvingHistory: value.calving_history.length === 0 ? [] : this.convertCalvingHistory(value.calving_history),
                calvingStat: value.calving_stat ? this.convertCalvingStats(value.calving_stat) : null,
                dam: this.convertDam(value.dam),
                sire: {
                  tagNumber: value.sire.tag_number
                },
                weightData: this.convertWeightData(value.weight_data),
                notes: value.notes,
                breed: value.breed,
                registered: this.convertBoolean(value.registered)
              });
            }

            return mappedAnimals;
          }
        }, {
          key: "convertBulls",
          value: function convertBulls(bullData) {
            var convertedBulls = [];

            for (var _i3 = 0, _Object$values2 = Object.values(bullData); _i3 < _Object$values2.length; _i3++) {
              var value = _Object$values2[_i3];
              var newBull = {
                breed: value.breed,
                name: value.name,
                tagNumber: value.tag_number
              };
              convertedBulls.push(newBull);
            }

            return convertedBulls;
          }
        }, {
          key: "convertWeightData",
          value: function convertWeightData(weightData) {
            var _this19 = this;

            return weightData.map(function (weight) {
              return _this19.convertWeight(weight);
            });
          }
        }, {
          key: "convertWeight",
          value: function convertWeight(weight) {
            return {
              id: weight.id,
              weightDate: this.convertDate(weight.weight_date),
              weightType: {
                isInitial: weight.is_initial_weight === 1 || weight.is_initial_weight ? true : false,
                isSale: weight.is_sale_weight === 1 || weight.is_sale_weight ? true : false
              },
              weight: weight.weight
            };
          }
        }, {
          key: "convertDam",
          value: function convertDam(dam) {
            return {
              birthDate: this.convertDate(dam.birth_date),
              gender: dam.sex,
              managementTag: dam.management_tag,
              tagNumber: dam.tag_number,
              damTag: dam.dam_tag_number,
              sireTag: dam.sire_tag_number
            };
          }
        }, {
          key: "convertCalvingStats",
          value: function convertCalvingStats(calvingStat) {
            return {
              alive: this.convertBoolean(calvingStat.alive),
              assistance: this.convertAssistance(calvingStat.assistance),
              damHealth: calvingStat.dam_health,
              drinkAssist: this.convertBoolean(calvingStat.alive) ? this.convertBoolean(calvingStat.drink_assist) : null,
              gettingUp: calvingStat.getting_up === null ? 5 : calvingStat.getting_up,
              assistanceReason: this.convertAssistanceReason(calvingStat.assist_reason),
              calvingNotes: calvingStat.calving_notes
            };
          }
        }, {
          key: "convertAssistanceReason",
          value: function convertAssistanceReason(reasons) {
            if (reasons === null) {
              return [_cms_enums__WEBPACK_IMPORTED_MODULE_1__["AssistanceReason"].NA];
            } else {
              var output = [];
              reasons.split('-').forEach(function (reason) {
                if (reason === 'bc') {
                  output.push(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["AssistanceReason"].BigCalf);
                } else if (reason === 'pp') {
                  output.push(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["AssistanceReason"].PoorPresentation);
                } else {
                  output.push(_cms_enums__WEBPACK_IMPORTED_MODULE_1__["AssistanceReason"].NA);
                }
              });
              return output;
            }
          }
        }, {
          key: "convertBoolean",
          value: function convertBoolean(value) {
            return value === 1 || value === true;
          }
        }, {
          key: "convertAssistance",
          value: function convertAssistance(assistance) {
            switch (assistance) {
              case 'v':
                return _cms_enums__WEBPACK_IMPORTED_MODULE_1__["CalvingAssistance"].Vet;

              case 'n':
                return _cms_enums__WEBPACK_IMPORTED_MODULE_1__["CalvingAssistance"].None;

              case 'r':
                return _cms_enums__WEBPACK_IMPORTED_MODULE_1__["CalvingAssistance"].Required;
            }
          }
        }, {
          key: "convertCalvingHistory",
          value: function convertCalvingHistory(calvingHistory) {
            return calvingHistory.map(function (calving) {
              return {
                averageGestation: calving.average_gestation,
                numberOfCalves: calving.number_of_calves
              };
            });
          }
        }, {
          key: "convertAiHistory",
          value: function convertAiHistory(aiHistory) {
            var _this20 = this;

            return aiHistory.map(function (aiOccurence) {
              return {
                aiDate: _this20.convertDate(aiOccurence.ai_date),
                bull: {
                  tagNumber: aiOccurence.bull.tag_number
                },
                heatDate: _this20.convertDate(aiOccurence.heat_date),
                sweeperBull: _this20.convertBoolean(aiOccurence.sweeper_bull),
                year: aiOccurence.year,
                id: aiOccurence.id
              };
            });
          }
        }, {
          key: "convertDate",
          value: function convertDate(date) {
            return moment__WEBPACK_IMPORTED_MODULE_2__(date, 'YYYY-MM-DD');
          }
        }]);

        return MappingService;
      }();

      MappingService.ɵfac = function MappingService_Factory(t) {
        return new (t || MappingService)();
      };

      MappingService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: MappingService,
        factory: MappingService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MappingService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "vY5A":
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /*! exports provided: AppRoutingModule */

    /***/
    function vY5A(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
        return AppRoutingModule;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @auth0/auth0-angular */
      "2beD");
      /* harmony import */


      var _cms_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @cms-enums */
      "heZn");
      /* harmony import */


      var _components_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./components/login/login.component */
      "W3Zi");
      /* harmony import */


      var _components_logout_logout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./components/logout/logout.component */
      "aer8");

      var routes = [{
        path: _cms_enums__WEBPACK_IMPORTED_MODULE_3__["PageURLs"].MainMenu,
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | components-main-menu-main-menu-module */
          "components-main-menu-main-menu-module").then(__webpack_require__.bind(null,
          /*! ./components/main-menu/main-menu.module */
          "m+ZE")).then(function (m) {
            return m.MainMenuModule;
          });
        },
        canActivate: [_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
      }, {
        path: _cms_enums__WEBPACK_IMPORTED_MODULE_3__["PageURLs"].Login,
        component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]
      }, {
        path: _cms_enums__WEBPACK_IMPORTED_MODULE_3__["PageURLs"].Logout,
        component: _components_logout_logout_component__WEBPACK_IMPORTED_MODULE_5__["LogoutComponent"]
      }, {
        path: '**',
        redirectTo: _cms_enums__WEBPACK_IMPORTED_MODULE_3__["PageURLs"].Login,
        pathMatch: 'full'
      }];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: AppRoutingModule
      });
      AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function AppRoutingModule_Factory(t) {
          return new (t || AppRoutingModule)();
        },
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            // imports: [RouterModule.forRoot(routes, { enableTracing: true })],
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "wGq0":
    /*!**************************************!*\
      !*** ./libs/interfaces/src/index.ts ***!
      \**************************************/

    /*! exports provided: bull, isAnimal, isCow, isBull, age, InterfacesModule */

    /***/
    function wGq0(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _lib_AnimalInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./lib/AnimalInterfaces */
      "Z2Vo");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "bull", function () {
        return _lib_AnimalInterfaces__WEBPACK_IMPORTED_MODULE_0__["bull"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "isAnimal", function () {
        return _lib_AnimalInterfaces__WEBPACK_IMPORTED_MODULE_0__["isAnimal"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "isCow", function () {
        return _lib_AnimalInterfaces__WEBPACK_IMPORTED_MODULE_0__["isCow"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "isBull", function () {
        return _lib_AnimalInterfaces__WEBPACK_IMPORTED_MODULE_0__["isBull"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "age", function () {
        return _lib_AnimalInterfaces__WEBPACK_IMPORTED_MODULE_0__["age"];
      });
      /* harmony import */


      var _lib_BreedInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./lib/BreedInterface */
      "npcF");
      /* empty/unused harmony star reexport */

      /* harmony import */


      var _lib_ErrorInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./lib/ErrorInterface */
      "AImA");
      /* empty/unused harmony star reexport */

      /* harmony import */


      var _lib_interfaces_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./lib/interfaces.module */
      "cHV0");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "InterfacesModule", function () {
        return _lib_interfaces_module__WEBPACK_IMPORTED_MODULE_3__["InterfacesModule"];
      });
      /*
       * Public API Surface of interfaces
       */

      /***/

    },

    /***/
    "yTl0":
    /*!************************************************!*\
      !*** ./libs/ngrx/src/lib/animalState/index.ts ***!
      \************************************************/

    /*! exports provided: AnimalActionTypes, LoadAnimalData, AddAnimal, UpdateAnimal, RetrieveAnimalData, LoadAnimalsFinished, UpdateAnimalWeight, AddAnimalWeight, HTTPError, AnimalEffects, selectAnimals, getAnimalByTag, getDams, getMaleOver36Months, getCalves, getUnregisteredCalves, animalAdapter, initialAnimalState, animalReducer, selectIds, selectEntities, selectAll, selectTotal */

    /***/
    function yTl0(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _animal_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./animal.actions */
      "DxyW");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "AnimalActionTypes", function () {
        return _animal_actions__WEBPACK_IMPORTED_MODULE_0__["AnimalActionTypes"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "LoadAnimalData", function () {
        return _animal_actions__WEBPACK_IMPORTED_MODULE_0__["LoadAnimalData"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "AddAnimal", function () {
        return _animal_actions__WEBPACK_IMPORTED_MODULE_0__["AddAnimal"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "UpdateAnimal", function () {
        return _animal_actions__WEBPACK_IMPORTED_MODULE_0__["UpdateAnimal"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "RetrieveAnimalData", function () {
        return _animal_actions__WEBPACK_IMPORTED_MODULE_0__["RetrieveAnimalData"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "LoadAnimalsFinished", function () {
        return _animal_actions__WEBPACK_IMPORTED_MODULE_0__["LoadAnimalsFinished"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "UpdateAnimalWeight", function () {
        return _animal_actions__WEBPACK_IMPORTED_MODULE_0__["UpdateAnimalWeight"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "AddAnimalWeight", function () {
        return _animal_actions__WEBPACK_IMPORTED_MODULE_0__["AddAnimalWeight"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "HTTPError", function () {
        return _animal_actions__WEBPACK_IMPORTED_MODULE_0__["HTTPError"];
      });
      /* harmony import */


      var _animal_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./animal.effects */
      "OdQ4");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "AnimalEffects", function () {
        return _animal_effects__WEBPACK_IMPORTED_MODULE_1__["AnimalEffects"];
      });
      /* harmony import */


      var _animal_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./animal.selectors */
      "FzOR");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "selectAnimals", function () {
        return _animal_selectors__WEBPACK_IMPORTED_MODULE_2__["selectAnimals"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "getAnimalByTag", function () {
        return _animal_selectors__WEBPACK_IMPORTED_MODULE_2__["getAnimalByTag"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "getDams", function () {
        return _animal_selectors__WEBPACK_IMPORTED_MODULE_2__["getDams"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "getMaleOver36Months", function () {
        return _animal_selectors__WEBPACK_IMPORTED_MODULE_2__["getMaleOver36Months"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "getCalves", function () {
        return _animal_selectors__WEBPACK_IMPORTED_MODULE_2__["getCalves"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "getUnregisteredCalves", function () {
        return _animal_selectors__WEBPACK_IMPORTED_MODULE_2__["getUnregisteredCalves"];
      });
      /* harmony import */


      var _animals_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./animals.reducer */
      "rQJC");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "animalAdapter", function () {
        return _animals_reducer__WEBPACK_IMPORTED_MODULE_3__["animalAdapter"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "initialAnimalState", function () {
        return _animals_reducer__WEBPACK_IMPORTED_MODULE_3__["initialAnimalState"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "animalReducer", function () {
        return _animals_reducer__WEBPACK_IMPORTED_MODULE_3__["animalReducer"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "selectIds", function () {
        return _animals_reducer__WEBPACK_IMPORTED_MODULE_3__["selectIds"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "selectEntities", function () {
        return _animals_reducer__WEBPACK_IMPORTED_MODULE_3__["selectEntities"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "selectAll", function () {
        return _animals_reducer__WEBPACK_IMPORTED_MODULE_3__["selectAll"];
      });
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "selectTotal", function () {
        return _animals_reducer__WEBPACK_IMPORTED_MODULE_3__["selectTotal"];
      });
      /***/

    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map
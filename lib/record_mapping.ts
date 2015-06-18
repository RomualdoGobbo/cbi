interface Validator{ (value: string, def?: any):boolean }
export interface FieldStruct{
    0:  number;
    1:  number;
    2:  string;
    3: Validator;
}


export type RecordStruct = Array<FieldStruct>;

export type FlowStruct = {

    [id : string] : RecordStruct
}

var V = require('./validators');
var R = require('ramda');
var any = R.anyPass; //union type

var IM : RecordStruct = [

    [1, 1, "filler1", V.blank ],
    [2, 3, "tipo_record", V.alphanumeric ],
    [4, 8, "mittente", V.SIA ],
    [9, 13, "ricevente", V.ABI ],
    [14, 19, "data_creazione", V.date],
    [20, 39, "nome_supporto", any([ V.alphanumeric, V.blank]) ],
    [40, 45, "campo_a_disposizione", any([ V.alphanumeric, V.blank ])],
    [46, 104, "filler2", V.blank],
    [105, 105, "tipo_flusso", any([ V.isEnum([1]), V.blank ])],
    [106, 106, "qualificatore_flusso", any([ R.equals('$'), V.blank ])],
    [107, 111, "soggetto_veicolatore", any([ V.ABI, V.blank] )],
    [112, 113, "filler3", V.blank ],
    [114, 114, "codice_divisa", R.equals('E')],
    [115, 115, "filler4", V.blank],
    [116, 120, "campo_non_disponibile", V.blank]
];


var PC : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 8, "mittente", R.T],
    [9, 13, "ricevente", R.T],
    [14, 19, "data_creazione", R.T],
    [20, 39, "nome_supporto", R.T],
    [40, 45, "campo_a_disposizione", R.T],
    [46, 104, "filler2", R.T],
    [105, 105, "tipo_flusso", R.T],
    [106, 106, "qualificatore_flusso", R.T],
    [107, 111, "soggetto_veicolatore", R.T],
    [112, 112, "filler3", R.T],
    [113, 113, "flag_priorita_trattamento_bonifico", R.T],
    [114, 114, "codice_divisa", R.T],
    [115, 115, "filler4", R.T],
    [116, 120, "campo_non_disponibile", R.T]
];

var PE : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 8, "mittente", R.T],
    [9, 13, "ricevente", R.T],
    [14, 19, "data_creazione", R.T],
    [20, 39, "nome_supporto", R.T],
    [40, 45, "campo_a_disposizione", R.T],
    [46, 104, "filler2", R.T],
    [105, 105, "tipo_flusso", R.T],
    [106, 106, "qualificatore_flusso", R.T],
    [107, 111, "soggetto_veicolatore", R.T],
    [112, 115, "filler3", R.T],
    [116, 120, "campo_non_disponibile", R.T]
];

var EF : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 8, "mittente", R.T],
    [9, 13, "ricevente", R.T],
    [14, 19, "data_creazione", R.T],
    [20, 39, "nome_supporto", R.T],
    [40, 45, "campo_a_disposizione", R.T],
    [46, 52, "numero_disposizioni", R.T],
    [53, 67, "tot_importi_negativi", R.T],
    [68, 82, "tot_importi_positivi", R.T],
    [83, 89, "numero_record", R.T],
    [90, 113, "filler2", R.T],
    [114, 114, "codice_divisa", R.T],
    [115, 120, "campo_non_disponibile", R.T ]
];


var EF_BON : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 8, "mittente", R.T],
    [9, 13, "ricevente", R.T],
    [14, 19, "data_creazione", R.T],
    [20, 39, "nome_supporto", R.T],
    [40, 45, "campo_a_disposizione", R.T],
    [46, 52, "numero_disposizioni", R.T],
    [53, 67, "tot_importi_negativi", R.T],
    [68, 82, "tot_importi_positivi", R.T],
    [83, 89, "numero_record", R.T],
    [90, 112, "filler2", R.T],
    [113, 113, "flag_priorita_trattamento_bonifico", R.T],
    [114, 114, "codice_divisa", R.T],
    [115, 120, "campo_non_disponibile", R.T]
];


var X : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 16, "filler2", R.T],
    [17, 22, "data_esecuzione_disposizione", R.T],
    [23, 28, "data_valuta_banca_beneficiario", R.T],
    [29, 33, "causale", R.T],
    [34, 46, "importo", R.T],
    [47, 47, "segno", R.T],
    [48, 52, "codice_abi_banca_ordinante", R.T],
    [53, 57, "codice_cab_banca_ordinante", R.T],
    [58, 69, "conto_ordinante", R.T],
    [70, 74, "codice_abi_banca_destinataria", R.T],
    [75, 79, "codice_cab_banca_destinataria", R.T],
    [80, 91, "conto_destinatario", R.T],
    [92, 96, "codice_azienda", R.T],
    [97, 97, "tipo_codice", R.T],
    [98, 113, "codice_cliente_beneficiario", R.T],
    [114, 114, "modalita_di_pagamento", R.T],
    [115, 118, "filler4", R.T],
    [119, 119, "flag_priorita_trattamento_bonifico", R.T],
    [120, 120, "codice_divisa", R.T]
];

var EF_BON_ES : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 8, "mittente", R.T],
    [9, 13, "ricevente", R.T],
    [14, 19, "data_creazione", R.T],
    [20, 39, "nome_supporto", R.T],
    [40, 45, "campo_a_disposizione", R.T],
    [46, 52, "numero_disposizioni", R.T],
    [53, 64, "filler2", R.T],
    [65, 82, "totale_importi", R.T],
    [83, 89, "numero_record", R.T],
    [90, 114, "filler3", R.T],
    [115, 120, "campo_non_disponibile", R.T]
];

var XIV : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 22, "filler2", R.T],
    [23, 28, "data_pagamento", R.T],
    [29, 33, "causale", R.T],
    [34, 46, "importo", R.T],
    [47, 47, "segno", R.T],
    [48, 52, "codice_abi_banca", R.T],
    [53, 57, "cab_banca", R.T],
    [58, 69, "conto", R.T],
    [70, 91, "filler3", R.T],
    [92, 96, "codice_azienda", R.T],
    [97, 97, "tipo_codice", R.T],
    [98, 113, "codice_cliente_debitore", R.T],
    [114, 119, "filler4", R.T],
    [120, 120, "codice_divisa", R.T]
];


var XVI : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 12, "codice_paese", R.T],
    [13, 14, "check_digit", R.T],
    [15, 15, "cin", R.T],
    [16, 20, "codice_abi", R.T],
    [21, 25, "codice_cab", R.T],
    [26, 37, "numero_conto", R.T],
    [38, 44, "filler2", R.T],
    [45, 120, "filler3", R.T]
];

var XVII : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 12, "codice_paese", R.T],
    [13, 14, "check_digit", R.T],
    [15, 15, "cin", R.T],
    [16, 20, "codice_abi", R.T],
    [21, 25, "codice_cab", R.T],
    [26, 37, "numero_conto", R.T],
    [38, 44, "filler2", R.T],
    [45, 120, "filler3", R.T]
];

var XX : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 34, "1_segmento", R.T],
    [35, 58, "2_segmento", R.T],
    [59, 82, "3_segmento", R.T],
    [83, 106, "4_segmento", R.T],
    [107, 120, "filler2", R.T]
];

var XX_BON : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 40, "denominazione_azienda", R.T],
    [41, 70, "indirizzo", R.T],
    [71, 100, "localita", R.T],
    [101, 116, "codifica_fiscale", R.T],
    [117, 120, "filler2", R.T]
];

var XXX : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 40, "1_segmento", R.T],
    [41, 70, "2_segmento", R.T],
    [71, 86, "codice_fiscale_cliente", R.T],
    [87, 120, "filler2", R.T]
];


var XXX_BON : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 40, "1_segmento", R.T],
    [41, 70, "2_segmento", R.T],
    [71, 100, "3_segmento", R.T],
    [101, 116, "codice_fiscale_cliente", R.T],
    [117, 120, "filler2", R.T]
];


var XL : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 40, "indirizzo", R.T],
    [41, 45, "cap", R.T],
    [46, 70, "comune_e_sigla_provincia", R.T],
    [71, 98, "completamento_indirizzo", R.T],
    [99, 100, "codice_paese", R.T],
    [101, 120, "filler2", R.T]
];


var XL_BON : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 40, "indirizzo", R.T],
    [41, 45, "cap", R.T],
    [46, 70, "comune_e_sigla_provincia", R.T],
    [71, 120, "banca_sportello_beneficiario", R.T]
];

var L_BON : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 40, "1_segmento", R.T],
    [41, 70, "2_segmento", R.T],
    [71, 100, "3_segmento", R.T],
    [101, 120, "filler2", R.T]
];


var L : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 50, "1_segmento", R.T],
    [51, 90, "2_segmento", R.T],
    [91, 120, "filler2", R.T]
];


var LI : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 20, "numero_disposizione", R.T],
    [21, 74, "filler2", R.T],
    [75, 86, "codice_identificativo_univoco", R.T],
    [87, 120, "filler3", R.T]
];

var LIX : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 65, "1_segmento", R.T],
    [66, 120, "2_segmento", R.T]
];

var LX : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 40, "1_segmento", R.T],
    [41, 70, "2_segmento", R.T],
    [71, 100, "3_segmento", R.T],
    [101, 120, "filler2", R.T]
];


var LXX : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 93, "filler2", R.T],
    [94, 94, "tipo_bollettino", R.T],
    [95, 95, "filler3", R.T],
    [96, 100, "campo_a_disposizione", R.T],
    [101, 120, "chiavi_di_controllo", R.T]
];

var LXX_BON : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 25, "filler2", R.T],
    [26, 30, "campo_non_disponibile", R.T],
    [31, 31, "tipo_flusso", R.T],
    [32, 32, "qualificatore_flusso", R.T],
    [33, 37, "soggetto_veicolatore", R.T],
    [38, 42, "codice_mp", R.T],
    [43, 69, "filler3", R.T],
    [70, 70, "flag_richiesta", R.T],
    [71, 100, "codice_univoco", R.T],
    [101, 110, "filler4", R.T],
    [111, 111, "cin_coordinate_bancaria", R.T],
    [112, 112, "filler5", R.T],
    [113, 120, "chiavi_di_controllo", R.T]
];

var IB : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 8, "mittente", R.T],
    [9, 13, "ricevente", R.T],
    [14, 19, "data_creazione", R.T],
    [20, 39, "nome_supporto", R.T],
    [40, 45, "cam Index signature of object type implicitly has an 'any' type.po_a_disposizione", R.T],
    [46, 104, "filler2", R.T],
    [105, 105, "tipo_flusso", R.T],
    [106, 106, "qualificatore_flusso", R.T],
    [107, 111, "soggetto_veicolatore", R.T],
    [112, 113, "filler3", R.T],
    [114, 114, "codice_divisa", R.T],
    [115, 115, "filler4", R.T],
    [116, 120, "campo_non_disponibile", R.T]
 ];


var XIV_IN : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 22, "filler2", R.T],
    [23, 28, "data_pagamento", R.T],
    [29, 33, "causale", R.T],
    [34, 46, "importo", R.T],
    [47, 47, "segno", R.T],
    [48, 52, "codice_abi_esattrice", R.T],
    [53, 57, "cab_esattrice", R.T],
    [58, 69, "filler3", R.T],
    [70, 74, "codice_abi_assuntrice", R.T],
    [75, 79, "cab_assuntrice", R.T],
    [80, 91, "conto", R.T],
    [92, 96, "codice_azienda", R.T],
    [97, 97, "tipo_codice", R.T],
    [98, 113, "codice_cliente_debitore", R.T],
    [114, 119, "filler4", R.T],
    [120, 120, "codice_divisa", R.T]
];


var LI_IN : RecordStruct = [
    [1, 1, "filler1", R.T],
    [2, 3, "tipo_record", R.T],
    [4, 10, "numero_progressivo", R.T],
    [11, 20, "numero_disposizione", R.T],
    [21, 74, "filler2", R.T],
    [75, 86, "codice_identificativo_univoco", R.T],
    [87, 91, "importo", R.T],
    [92, 97, "valuta_di_addebito", R.T],
    [98, 109, "riferimento", R.T],
    [110, 115, "data_effettiva_di_pagamento", R.T],

    [116, 120, "campo_non_disponibile", R.T]
];


var OUTPUT_RECORD_MAPPING: FlowStruct = {
    'IM': IM,
    'EF': EF,
    'PC': PC,
    '10': X,
    '14': XIV,
    '16': XVI,
    '17': XVII,
    '20': XX,
    '30': XXX,
    '40': XL,
    '50': L,
    '51': LI,
    '59': LIX,
    '70': LXX,
    'IB': IB,
};

var INPUT_RECORD_MAPPING: FlowStruct = {
    'IM': IM,
    'EF': EF,
    '14': XIV_IN,
    '20': XX,
    '30': XXX,
    '40': XL,
    '50': L,
    '51': LI_IN,
    '59': LIX,
    '70': LXX,
    'IB': IB,
};

var BONIFICI: FlowStruct = {
    'PC': PC,
    '10': X,
    '16': XVI,
    '17': XVII,
    '20': XX_BON,
    '30': XXX_BON,
    '40': XL_BON,
    '50': L_BON,
    '60': LX,
    '70': LXX_BON,
    'EF': EF_BON
}

var MAV : FlowStruct = {
    'IM': IM,
    'EF': EF,
    '14': XIV_IN,
    '20': XX,
    '30': XXX,
    '40': XL,
    '50': L,
    '51': LI_IN,
    '59': LIX,
    '70': LXX,
    'IB': IB
}

interface Mappings {

    [index : string] : FlowStruct;
};

export var MAPPINGS: Mappings = {
    OUTPUT_RECORD_MAPPING : OUTPUT_RECORD_MAPPING,
    INPUT_RECORD_MAPPING : INPUT_RECORD_MAPPING,
    BONIFICI : BONIFICI,
    MAV : MAV
};

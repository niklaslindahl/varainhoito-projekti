export type AllocationCategory = "Osakkeet" | "Korot" | "Vaihtoehtoiset" | "Kateinen";

export type Allocation = {
  luokka: AllocationCategory;
  prosentti: number;
};

export type WarningType = "yhtio" | "sektori" | "alue";

export type DiversificationWarning = {
  tyyppi: WarningType;
  kohde: string;
  prosentti: number;
  kuvaus: string;
};

export type RiskLabel = "varovainen" | "maltillinen" | "aktiivinen" | "aggressiivinen";

export type RiskProfile = {
  leima: RiskLabel;
  perustelu: string;
};

export type Impact = "matala" | "keskitaso" | "korkea";

export type Recommendation = {
  otsikko: string;
  perustelu: string;
  vaikutus: Impact;
};

export type AnalysisResult = {
  allokaatio: Allocation[];
  hajautusvaroitukset: DiversificationWarning[];
  riskiprofiili: RiskProfile;
  suositukset: Recommendation[];
};

export type AnalysisError = {
  virhe: string;
  selitys: string;
};

export type ApiResponse = AnalysisResult | AnalysisError;

export function isAnalysisError(r: ApiResponse): r is AnalysisError {
  return "virhe" in r;
}

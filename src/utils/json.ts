export type JSONArray = JSONValue[];
export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
export type JSONObject = {[key: string]: JSONValue};
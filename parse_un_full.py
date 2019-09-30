import pandas as pd
import os
import re
import numpy as np

terms_dict = {
"SI_POV_DAY1" : "Poverty",
"SN_ITK_DEFC" : "Food Shortage",
"SE_REA_PROF" : "Reading level",
"SH_H2O_SAFE" : "Clean Water",
"VC_DSR_MTMP" : "Disaster Impact",
"AG_LND_DGRD" : "Land Degredation",
"IT_USE_ii99" : "Internet Access"
}

countries_dict = {
"Bolivia (Plurinational State of)" : "Bolivia",
"Brunei Darussalam" : "Brunei",
"Cabo Verde" : "Cape Verde",
"CÃÂ´te d'Ivoire" : "C?te d'Ivoire",
"Cocos (Keeling) Islands" : "Cocos [Keeling] Islands",
"Congo": "Congo [DRC]",
"Czechia": "Czech Republic",
"Falkland Islands (Malvinas)": "Falkland Islands [Islas Malvinas]",
"China, Hong Kong Special Administrative Region": "Hong Kong",
"Iran (Islamic Republic of)": "Iran",
"Lao People's Democratic Republic":"Laos",
"Micronesia (Federated States of)": "Micronesia",
"Republic of Moldova":"Moldova",
"Myanmar": "Myanmar [Burma]",
"North Macedonia": "Macedonia [FYROM]",
"State of Palestine":"Palestinian Territories", 
"Pitcairn":"Pitcairn Islands",
"Polynesia": "French Polynesia",
"RÃÂ©union":"R?union",
"Democratic People's Republic of Korea":"North Korea",
"Republic of Korea":"South Korea",
"Russian Federation":"Russia",
"South Sudan":"Sudan",
"Svalbard and Jan Mayen Islands":"Svalbard and Jan Mayen",
"Syrian Arab Republic":"Syria",
"United Republic of Tanzania":"Tanzania",
"United States Minor Outlying Islands": "U.S. Minor Outlying Islands",
"United States Virgin Islands":"U.S. Virgin Islands",
"United States of America":"United States",
"United Kingdom of Great Britain and Northern Ireland":"United Kingdom",
"Venezuela (Bolivarian Republic of)":"Venezuela",
"Viet Nam":"Vietnam",
"Wallis and Futuna Islands":"Wallis and Futuna",

}

def get_proper_countries(x):
    x = str(x)
    if x in countries_dict:
        #print(countries_dict[x])
        return countries_dict[x]
    else:
        return x

def alter_names(x):
    x = str(x)
    return terms_dict[x]

def remove_string(x):
    if isinstance(x, str):
        if len(''.join(x.split())) == 0:
            return 0.0
        if "<" in x:
            return float(x[1:])
        if not x.replace('.','',1).isdigit():
            return 0.0
    else:
        if x == '\n' or x == '\t' or x == ' ' or x == '  ':
            return 0.0
    if not x:
        return 0.0
    return x

directory = os.getcwd()
print("DIRECTORY:", directory)
csvs = dict()

for filename in os.listdir(directory):
    if filename.endswith(".csv"):
        csvs[filename] = (pd.read_csv(filename, header=0))

countries = list(csvs["geo_data.csv"].name)
countries.sort()
un_data = csvs["excel_cleansed.csv"]

# arr = un_data.GeoAreaName.unique()
# arr.sort()
# p = []
# for i in arr:
#     p.append(i)

# difference = len(p) - len(countries)

# for _ in range(difference):
#     countries.append("PADDING")

# print(countries)

# o = un_data['GeoAreaName'].tolist()
# output = set()
# for w in o:
#     if w in countries:
#         output.add(w)
# output = sorted(output)


# difference = len(p) - len(output)

# for _ in range(difference):
#     output.append("PADDING")


un_data['GeoAreaName'] = un_data['GeoAreaName'].apply(lambda x: get_proper_countries(x))

un_data_world = un_data[un_data['GeoAreaName'].isin(countries)]
un_data_sex = un_data_world[~un_data_world['[Sex]'].isin(["FEMALE","MALE"])]
un_data_final = un_data_sex[~un_data_sex['[Location]'].isin(["RURAL","URBAN"])]

un_data_final = un_data_final.drop(['[Sex]'], axis=1)
un_data_final = un_data_final.drop(['[Location]'], axis=1)
un_data_final = un_data_final.drop(['[Education level]'], axis=1)
un_data_final = un_data_final.drop(['[Type of product]'], axis=1)

un_data_final['SeriesCode'] = un_data_final['SeriesCode'].apply(lambda x: alter_names(x))
un_data_final['Value'] = un_data_final['Value'].apply(lambda x: remove_string(x))
un_data_final = un_data_final.drop(['SeriesDescription'], axis=1)
un_data_final.sort_values(by=['SeriesCode','TimePeriod', 'GeoAreaName'], inplace=True)


def normalise_values(df, filter):
    code_df = df.loc[df['SeriesCode'].isin([filter])]
    years = code_df.TimePeriod.unique()
    year_dfs = []
    for year in years:
        year_dfs.append(code_df.loc[code_df['TimePeriod'].isin([year])])

    year_vals = []
    for year in year_dfs:
        values = year['Value'].tolist()
        values = list(map(float, values))
        amin, amax = min(values), max(values)
        for i, val in enumerate(values):
            try:
                values[i] = (val-amin) / (amax-amin)
            except ZeroDivisionError:
                values[i] = 0
        year_vals.extend(values)
    return year_vals
    
    
un_data_out = un_data_final
un_data_out = un_data_out.drop(['Value'], axis=1)

normalised = []

def add_values(df, name):
    val = normalise_values(df, name)
    normalised.extend(val)

add_values(un_data_final, "Clean Water")
add_values(un_data_final, "Disaster Impact")
add_values(un_data_final, "Food Shortage")
add_values(un_data_final, "Internet Access")
add_values(un_data_final, "Land Degredation")
add_values(un_data_final, "Poverty")
add_values(un_data_final, "Reading level")

print(len(normalised))

se = pd.Series(normalised)
un_data_out['values'] = se.values

un_data_out.to_csv(r'all_countries.csv', index=False)


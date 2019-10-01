import pandas as pd
import os
import re
import numpy as np

terms_dict = {
"SI_POV_DAY1" : "no_poverty",
"SN_ITK_DEFC" : "zero_hunger",
"SE_REA_PROF" : "quality_education",
"SH_H2O_SAFE" : "clean_water",
"VC_DSR_MTMP" : "sustainable_cities",
"AG_LND_DGRD" : "biodiversity",
"IT_USE_ii99" : "internet_access"
}

countries = ["Aruba","Afghanistan","Angola","Anguilla","Albania","Aland","Andorra","United Arab Emirates","Argentina","Armenia","American Samoa","Antarctica","Ashmore and Cartier Islands","French Southern and Antarctic Lands","Antigua and Barbuda","Australia","Austria","Azerbaijan","Burundi","Belgium","Benin","Burkina Faso","Bangladesh","Bulgaria","Bahrain","The Bahamas","Bosnia and Herzegovina","Saint Barthelemy","Belarus","Belize","Bermuda","Bolivia","Brazil","Barbados","Brunei","Bhutan","Botswana","Central African Republic","Canada","Switzerland","Chile","China","Ivory Coast","Cameroon","Democratic Republic of the Congo","Republic of Congo","Cook Islands","Colombia","Comoros","Cape Verde","Costa Rica","Cuba","Curaçao","Cayman Islands","Northern Cyprus","Cyprus","Czech Republic","Germany","Djibouti","Dominica","Denmark","Dominican Republic","Algeria","Ecuador","Egypt","Eritrea","Spain","Estonia","Ethiopia","Finland","Fiji","Falkland Islands","France","Faroe Islands","Federated States of Micronesia","Gabon","United Kingdom","Georgia","Guernsey","Ghana","Guinea","Gambia","Guinea Bissau","Equatorial Guinea","Greece","Grenada","Greenland","Guatemala","Guam","Guyana","Hong Kong S.A.R.","Heard Island and McDonald Islands","Honduras","Croatia","Haiti","Hungary","Indonesia","Isle of Man","India","Indian Ocean Territories","British Indian Ocean Territory","Ireland","Iran","Iraq","Iceland","Israel","Italy","Jamaica","Jersey","Jordan","Japan","Siachen Glacier","Kazakhstan","Kenya","Kyrgyzstan","Cambodia","Kiribati","Saint Kitts and Nevis","South Korea","Kosovo","Kuwait","Laos","Lebanon","Liberia","Libya","Saint Lucia","Liechtenstein","Sri Lanka","Lesotho","Lithuania","Luxembourg","Latvia","Macao S.A.R","Saint Martin","Morocco","Monaco","Moldova","Madagascar","Maldives","Mexico","Marshall Islands","Macedonia","Mali","Malta","Myanmar","Montenegro","Mongolia","Northern Mariana Islands","Mozambique","Mauritania","Montserrat","Mauritius","Malawi","Malaysia","Namibia","New Caledonia","Niger","Norfolk Island","Nigeria","Nicaragua","Niue","Netherlands","Norway","Nepal","Nauru","New Zealand","Oman","Pakistan","Panama","Pitcairn Islands","Peru","Philippines","Palau","Papua New Guinea","Poland","Puerto Rico","North Korea","Portugal","Paraguay","Palestine","French Polynesia","Qatar","Romania","Russia","Rwanda","Western Sahara","Saudi Arabia","Sudan","South Sudan","Senegal","Singapore","South Georgia and South Sandwich Islands","Saint Helena","Solomon Islands","Sierra Leone","El Salvador","San Marino","Somaliland","Somalia","Saint Pierre and Miquelon","Republic of Serbia","Sao Tome and Principe","Suriname","Slovakia","Slovenia","Sweden","Swaziland","Sint Maarten","Seychelles","Syria","Turks and Caicos Islands","Chad","Togo","Thailand","Tajikistan","Turkmenistan","East Timor","Tonga","Trinidad and Tobago","Tunisia","Turkey","Taiwan","United Republic of Tanzania","Uganda","Ukraine","Uruguay","United States of America","Uzbekistan","Vatican","Saint Vincent and the Grenadines","Venezuela","British Virgin Islands","United States Virgin Islands","Vietnam","Vanuatu","Wallis and Futuna","Samoa","Yemen","South Africa","Zambia","Zimbabwe"]

countries_dict = {
"Bolivia (Plurinational State of)" : "Bolivia",
"Brunei Darussalam" : "Brunei",
"Bahamas" : "The Bahamas",
"Guinea-Bissau": "Guinea Bissau",
"Cabo Verde" : "Cape Verde",
"CÃÂÃÂ´te d'Ivoire" : "C?te d'Ivoire",
"Cocos (Keeling) Islands" : "Cocos [Keeling] Islands",
"Congo": "Republic of Congo",
"Czechia": "Czech Republic",
"Falkland Islands (Malvinas)": "Falkland Islands",
"Iran (Islamic Republic of)": "Iran",
"Lao People's Democratic Republic":"Laos",
"Micronesia (Federated States of)": "Federated States of Micronesia",
"Micronesia" : "Federated States of Micronesia",
"Republic of Moldova":"Moldova",
"Myanmar": "Myanmar [Burma]",
"China, Macao Special Administrative Region" : "Macao S.A.R",
"China, Hong Kong Special Administrative Region" : "Hong Kong S.A.R",
"Serbia" : "Republic of Serbia",
"North Macedonia": "Macedonia [FYROM]",
"State of Palestine":"Palestinian", 
"Pitcairn":"Pitcairn Islands",
"Polynesia": "French Polynesia",
"RÃÂÃÂ©union":"R?union",
"Democratic People's Republic of Korea":"North Korea",
"Republic of Korea":"South Korea",
"Russian Federation":"Russia",
"South Sudan":"Sudan",
"Svalbard and Jan Mayen Islands":"Svalbard and Jan Mayen",
"Syrian Arab Republic":"Syria",
"Timor-Leste":"East Timor",
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
        return countries_dict[x]
    else:
        return x

def alter_names(x):
    x = str(x)
    return terms_dict[x]

def get_empty(x):
    if np.isnan([x]):
        print(x)
    return x

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

# countries = list(csvs["geo_data.csv"].name)
# countries.sort()
un_data = csvs["excel_cleansed.csv"]

arr = un_data.GeoAreaName.unique()
arr.sort()
p = []
for i in arr:
    p.append(i)


# print(p)

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

geo_js = ["Aruba","Afghanistan","Angola","Anguilla","Albania","Aland","Andorra","United Arab Emirates","Argentina","Armenia","American Samoa","Antarctica","Ashmore and Cartier Islands","French Southern and Antarctic Lands","Antigua and Barbuda","Australia","Austria","Azerbaijan","Burundi","Belgium","Benin","Burkina Faso","Bangladesh","Bulgaria","Bahrain","The Bahamas","Bosnia and Herzegovina","Saint Barthelemy","Belarus","Belize","Bermuda","Bolivia","Brazil","Barbados","Brunei","Bhutan","Botswana","Central African Republic","Canada","Switzerland","Chile","China","Ivory Coast","Cameroon","Democratic Republic of the Congo","Republic of Congo","Cook Islands","Colombia","Comoros","Cape Verde","Costa Rica","Cuba","CuraÃ§ao","Cayman Islands","Northern Cyprus","Cyprus","Czech Republic","Germany","Djibouti","Dominica","Denmark","Dominican Republic","Algeria","Ecuador","Egypt","Eritrea","Spain","Estonia","Ethiopia","Finland","Fiji","Falkland Islands","France","Faroe Islands","Federated States of Micronesia","Gabon","United Kingdom","Georgia","Guernsey","Ghana","Guinea","Gambia","Guinea Bissau","Equatorial Guinea","Greece","Grenada","Greenland","Guatemala","Guam","Guyana","Hong Kong S.A.R.","Heard Island and McDonald Islands","Honduras","Croatia","Haiti","Hungary","Indonesia","Isle of Man","India","Indian Ocean Territories","British Indian Ocean Territory","Ireland","Iran","Iraq","Iceland","Israel","Italy","Jamaica","Jersey","Jordan","Japan","Siachen Glacier","Kazakhstan","Kenya","Kyrgyzstan","Cambodia","Kiribati","Saint Kitts and Nevis","South Korea","Kosovo","Kuwait","Laos","Lebanon","Liberia","Libya","Saint Lucia","Liechtenstein","Sri Lanka","Lesotho","Lithuania","Luxembourg","Latvia","Macao S.A.R","Saint Martin","Morocco","Monaco","Moldova","Madagascar","Maldives","Mexico","Marshall Islands","Macedonia","Mali","Malta","Myanmar","Montenegro","Mongolia","Northern Mariana Islands","Mozambique","Mauritania","Montserrat","Mauritius","Malawi","Malaysia","Namibia","New Caledonia","Niger","Norfolk Island","Nigeria","Nicaragua","Niue","Netherlands","Norway","Nepal","Nauru","New Zealand","Oman","Pakistan","Panama","Pitcairn Islands","Peru","Philippines","Palau","Papua New Guinea","Poland","Puerto Rico","North Korea","Portugal","Paraguay","Palestine","French Polynesia","Qatar","Romania","Russia","Rwanda","Western Sahara","Saudi Arabia","Sudan","South Sudan","Senegal","Singapore","South Georgia and South Sandwich Islands","Saint Helena","Solomon Islands","Sierra Leone","El Salvador","San Marino","Somaliland","Somalia","Saint Pierre and Miquelon","Republic of Serbia","Sao Tome and Principe","Suriname","Slovakia","Slovenia","Sweden","Swaziland","Sint Maarten","Seychelles","Syria","Turks and Caicos Islands","Chad","Togo","Thailand","Tajikistan","Turkmenistan","East Timor","Tonga","Trinidad and Tobago","Tunisia","Turkey","Taiwan","United Republic of Tanzania","Uganda","Ukraine","Uruguay","United States of America","Uzbekistan","Vatican","Saint Vincent and the Grenadines","Venezuela","British Virgin Islands","United States Virgin Islands","Vietnam","Vanuatu","Wallis and Futuna","Samoa","Yemen","South Africa","Zambia","Zimbabwe"]

un_data_world = un_data[un_data['GeoAreaName'].isin(geo_js)]

un_data = un_data_world[un_data_world.Sex != "FEMALE"]
un_data = un_data[un_data.Sex != "MALE"]
un_data = un_data[un_data.Location != "RURAL"]
un_data = un_data[un_data.Location != "URBAN"]

un_data = un_data.drop(['Sex'], axis=1)
un_data = un_data.drop(['Location'], axis=1)
un_data = un_data.drop(['Education level'], axis=1)
un_data = un_data.drop(['Type of product'], axis=1)

#un_data['Value'].apply(lambda x: get_empty(x))

un_data['SeriesCode'] = un_data['SeriesCode'].apply(lambda x: alter_names(x))
un_data['Value'] = un_data['Value'].apply(lambda x: remove_string(x))
un_data = un_data.drop(['SeriesDescription'], axis=1)
un_data.sort_values(by=['SeriesCode','TimePeriod', 'GeoAreaName'], inplace=True)


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
                values[i] = 0.0
        year_vals.extend(values)
        
    return year_vals
    
    
un_data_out = un_data.drop(['Value'], axis=1)

normalised = []

def add_values(df, name):
    val = normalise_values(df, name)
    normalised.extend(val)

add_values(un_data, "biodiversity")
add_values(un_data, "clean_water")
add_values(un_data, "internet_access")
add_values(un_data, "no_poverty")
add_values(un_data, "quality_education")
add_values(un_data, "sustainable_cities")
add_values(un_data, "zero_hunger")





se = pd.Series(normalised)
un_data_out['values'] = se.values

un_data_out.to_csv(r'all_countries.csv', index=False)
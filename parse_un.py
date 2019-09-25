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

def alter_names(x):
    x = str(x)
    return terms_dict[x]

directory = os.getcwd()
print("DIRECTORY:", directory)
csvs = dict()

for filename in os.listdir(directory):
    if filename.endswith(".csv"):
        csvs[filename] = (pd.read_csv(filename, header=0))

def print_stats(data):
    size = data.size 
    shape = data.shape 
    df_ndim = data.ndim 
    series_ndim = data["GeoAreaName"].ndim 
    print("Size = {}\nShape ={}\nShape[0] x Shape[1] = {}".format(size, shape, shape[0]*shape[1])) 
    print("ndim of dataframe = {}\nndim of series ={}".format(df_ndim, series_ndim))

countries = list(csvs["geo_data.csv"].name)
un_data = csvs["excel_cleansed.csv"]

un_data_world = un_data[un_data['GeoAreaName'].isin(countries)]
un_data_sex = un_data_world[~un_data_world['[Sex]'].isin(["FEMALE","MALE"])]
un_data_final = un_data_sex[~un_data_sex['[Location]'].isin(["RURAL","URBAN"])]

un_data_final = un_data_final.drop(['[Sex]'], axis=1)
un_data_final = un_data_final.drop(['[Location]'], axis=1)
un_data_final = un_data_final.drop(['[Education level]'], axis=1)
un_data_final = un_data_final.drop(['[Type of product]'], axis=1)

un_data_final['SeriesCode'] = un_data_final['SeriesCode'].apply(lambda x: alter_names(x))

un_data_final.to_csv(r'processed_un.csv', index=False)


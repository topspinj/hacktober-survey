library("rworldmap")
library("countrycode")
library("tidyverse")
library("stringr")
library("RColorBrewer")

favLang <- read.csv(file="favLang.csv", sep=",")

favLang$iso3 <- countrycode(favLang$country, 'country.name', 'iso3c')

favFreq<- favLang %>% 
  group_by(iso3) %>% 
  summarise(frequency = n())


countries <- favFreq$iso3

favDf <- data.frame(country = favFreq$iso3,
                    freq = favFreq$frequency)

favMap <- joinCountryData2Map(favDf, joinCode = "ISO3",
                              nameJoinColumn = "country")

favMap <- mapCountryData(favMap, nameColumnToPlot="freq", mapTitle="Contributors by Country of Origin", catMethod="pretty",
               missingCountryCol = gray(.8), addLegend=F, colourPalette=colorRampPalette(brewer.pal(9,”Blues”))(30))

do.call(addMapLegend, c(favMap,
                        legendShrink=0.8,
                        legendWidth=0.5))


library("countrycode")
library("tidyverse")
library("ggplot2")
library("stringr")
library("RColorBrewer")
library("viridis")

favLang <- read.csv(file="favLang.csv", sep=",")

favLang$iso3 <- countrycode(favLang$country, 'country.name', 'iso3c')

favLangFreq<- favLang %>% 
  group_by(iso3) %>% 
  summarise(frequency = n())

map <- map_data("world")
map$iso3 <- countrycode::countrycode(map$region, 'country.name', 'iso3c')

# combine fav lang dataframe with world map dataframe
favLangMap <- left_join(map, favLangFreq, by="iso3")

# create a map
ggplot(favLangMap) +
  geom_polygon(aes(x = long, y = lat, group = group, fill = frequency)) +
  scale_fill_gradient(low="red", high="black") +
  ylab("latitude") +
  xlab("longitude") +
  ggtitle("Contributors by Country of Origin") +
  theme_minimal()




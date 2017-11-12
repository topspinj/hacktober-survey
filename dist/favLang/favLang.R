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
favLangMap <- ggplot(favLangMap) +
  geom_polygon(aes(x = long, y = lat, group = group, fill = frequency), size=0.2, color="grey50") +
  ylab("latitude") +
  xlab("longitude") +
  scale_fill_distiller(palette="Blues", na.value="white") +
  ggtitle("Contributors by Country of Origin") +
  theme_minimal() +
  theme(panel.border = element_blank(),
        panel.grid.major = element_blank(),
        panel.grid.minor = element_blank())
favLangMap
ggsave("fav_lang.pdf", favLangMap)



package model

type Manga struct {
	ID        string `json:"id" bson:"id"`
	Title     string `bson:"title" json:"title"`
	Url       string `bson:"url" json:"url"`
	Poster    string `json:"poster" bson:"poster"`
	Chapter   string `json:"chapter" bson:"chapter"`
	CreatedAt int64  `json:"createdAt" bson:"createdAt"`
}

type MangaSearch struct {
	Title string `json:"title" bson:"title"`
}

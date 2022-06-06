package resource

import "testing"

func TestRetrievePosterSuccess(t *testing.T) {
	poster := RetrievePoster("https://manganato.com/manga-lg988863")

	want := "https://avt.mkklcdnv6temp.com/6/l/24-1618675007.jpg"

	if poster != want {
		t.Errorf("got %q, wanted %q", poster, want)
	}
}

func TestRetrievePosterFail(t *testing.T) {
	poster := RetrievePoster("https://manganato.com/manga-lg98863")

	want := "https://avt.mkklcdnv6temp.com/6/l/24-1618675007.jpg"

	if poster == want {
		t.Errorf("got %q, wanted %q", poster, want)
	}
}

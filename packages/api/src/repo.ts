import { Store } from "short-site-store";

async function setFavorite(email: string, videoId: string, isFavorite: boolean) {
  const store = new Store();
  const favs = await store.downloadFavorites();

  if (isFavorite) {
    favs.addFavorite(email, videoId);
  } else {
    favs.removeFavorite(email, videoId);
  }

  return store.updateLocalFavorites(favs);
}

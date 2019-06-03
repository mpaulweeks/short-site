import { Store } from "short-site-store";

export interface FavoritesData {
  user: Array<string>,
};

export async function setFavorite(email: string, videoId: string, isFavorite: boolean): Promise<FavoritesData> {
  const store = new Store();
  const favs = await store.downloadFavorites();

  if (isFavorite) {
    favs.addFavorite(email, videoId);
  } else {
    favs.removeFavorite(email, videoId);
  }
  await store.updateLocalFavorites(favs);
  await store.uploadFavoritesToGCP(favs);

  return {
    user: favs.getUser(email),
  };
}

export async function getFavorites(email: string): Promise<FavoritesData> {
  const store = new Store();
  const favs = await store.downloadFavorites();
  return {
    user: favs.getUser(email),
  };
}

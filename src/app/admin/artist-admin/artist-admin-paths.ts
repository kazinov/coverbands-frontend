import { AdminPaths } from '@admin/admin-paths';

export enum ArtistAdminPaths {
  Artist = 'artist',
  Create = 'create',
  Edit = 'edit',
  List = 'list'
}

export const CREATE_ARTIST_URL = `/${AdminPaths.Admin}/${ArtistAdminPaths.Artist}/${ArtistAdminPaths.Create}`;

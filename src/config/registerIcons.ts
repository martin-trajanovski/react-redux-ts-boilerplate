import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function registerIcons(): void {
  library.add(faTrash, faSignOutAlt);
}

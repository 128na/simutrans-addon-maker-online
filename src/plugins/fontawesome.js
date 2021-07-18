import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// https://github.com/FortAwesome/vue-fontawesome/tree/3.x
import { faUser } from '@fortawesome/free-solid-svg-icons'
library.add(faUser);

import { faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
library.add(faGoogle);
library.add(faTwitter);

export default FontAwesomeIcon;
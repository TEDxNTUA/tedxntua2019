'''Configuration for production mode'''
from .base import * # pylint: disable=wildcard-import
from .env import abs_path


WEBPACK_LOADER['DEFAULT'].update({
    'BUNDLE_DIR_NAME': 'dist/',
    'STATS_FILE': abs_path('bundles', 'webpack-stats.prod.json'),
})

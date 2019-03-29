import i18n from '@/utils/locale'
import pfFormInput from '@/components/pfFormInput'
import pfFormToggle from '@/components/pfFormToggle'
import { pfSearchConditionType as conditionType } from '@/globals/pfSearch'
import {
  and,
  isFQDN,
  isHex,
  isPort
} from '@/globals/pfValidators'

const {
  required,
  ipAddress,
  maxLength,
  minValue
} = require('vuelidate/lib/validators')

/**
 * General Settings
**/
export const pfConfigurationProfilingGeneralSettingsViewFields = (context = {}) => {
  return [
    {
      tab: null, // ignore tabs
      fields: [
        {
          label: i18n.t('API Key'),
          text: i18n.t('API key to interact with upstream Fingerbank project. Changing this value requires to restart the Fingerbank collector.'),
          fields: [
            {
              key: 'upstream.api_key',
              component: pfFormInput,
              validators: {
                [i18n.t('Key required.')]: required,
                [i18n.t('Invalid Key.')]: and(maxLength(255), isHex)
              }
            }
          ]
        },
        {
          label: i18n.t('Upstream API host'),
          text: i18n.t('The host on which the Fingerbank API should be reached.'),
          fields: [
            {
              key: 'upstream.host',
              component: pfFormInput,
              validators: {
                [i18n.t('Invalid Host.')]: and(maxLength(255), isFQDN)
              }
            }
          ]
        },
        {
          label: i18n.t('Upstream API port'),
          text: i18n.t('The port on which the Fingerbank API should be reached.'),
          fields: [
            {
              key: 'upstream.port',
              component: pfFormInput,
              attrs: {
                type: 'number',
                step: 1
              },
              validators: {
                [i18n.t('Invalid Port.')]: isPort
              }
            }
          ]
        },
        {
          label: i18n.t('Upstream API HTTPS'),
          text: i18n.t('Whether or not HTTPS should be used to communicate with the Fingerbank API.'),
          fields: [
            {
              key: 'upstream.use_https',
              component: pfFormToggle,
              attrs: {
                values: { checked: 'enabled', unchecked: 'disabled' }
              }
            }
          ]
        },
        {
          label: i18n.t('Database API path'),
          text: i18n.t('Path used to fetch the database on the Fingerbank API.'),
          fields: [
            {
              key: 'upstream.db_path',
              component: pfFormInput
            }
          ]
        },
        {
          label: i18n.t('Retention of the upstream sqlite DB'),
          text: i18n.t('Amount of upstream databases to retain on disk in db/. Should be at least one in case any running processes are still pointing on the old file descriptor of the database.'),
          fields: [
            {
              key: 'upstream.sqlite_db_retention',
              component: pfFormInput,
              attrs: {
                type: 'number',
                step: 1
              }
            }
          ]
        },
        {
          label: i18n.t('Collector host'),
          text: i18n.t('The host on which the Fingerbank collector should be reached.'),
          fields: [
            {
              key: 'collector.host',
              component: pfFormInput,
              validators: {
                [i18n.t('Invalid IP Address.')]: ipAddress
              }
            }
          ]
        },
        {
          label: i18n.t('Collector port'),
          text: i18n.t('The port on which the Fingerbank collector should be reached.'),
          fields: [
            {
              key: 'collector.port',
              component: pfFormInput,
              attrs: {
                type: 'number',
                step: 1
              },
              validators: {
                [i18n.t('Invalid Port.')]: isPort
              }
            }
          ]
        },
        {
          label: i18n.t('Collector HTTPS'),
          text: i18n.t('Whether or not HTTPS should be used to communicate with the collector.'),
          fields: [
            {
              key: 'collector.use_https',
              component: pfFormToggle,
              attrs: {
                values: { checked: 'enabled', unchecked: 'disabled' }
              }
            }
          ]
        },
        {
          label: i18n.t('Inactive endpoints expiration'),
          text: i18n.t('Amount of hours after which the information inactive endpoints should be removed from the collector.'),
          fields: [
            {
              key: 'collector.inactive_endpoints_expiration',
              component: pfFormInput,
              attrs: {
                type: 'number',
                step: 1
              },
              validators: {
                [i18n.t('Invalid Value.')]: minValue(1)
              }
            }
          ]
        },
        {
          label: i18n.t('ARP lookups by the collector'),
          text: i18n.t('Whether or not the collector should perform ARP lookups for devices it doesn\'t have DHCP information.'),
          fields: [
            {
              key: 'collector.arp_lookup',
              component: pfFormToggle,
              attrs: {
                values: { checked: 'enabled', unchecked: 'disabled' }
              }
            }
          ]
        },
        {
          label: i18n.t('Query cache time in the collector'),
          text: i18n.t('Amount of minutes for which the collector API query results are cached.'),
          fields: [
            {
              key: 'collector.query_cache_time',
              component: pfFormInput,
              attrs: {
                type: 'number',
                step: 1
              },
              validators: {
                [i18n.t('Invalid Value.')]: minValue(1)
              }
            }
          ]
        },
        {
          label: i18n.t('Database persistence interval'),
          text: i18n.t('Interval in seconds at which the collector will persist its databases.'),
          fields: [
            {
              key: 'collector.db_persistence_interval',
              component: pfFormInput,
              attrs: {
                type: 'number',
                step: 1
              },
              validators: {
                [i18n.t('Invalid Value.')]: minValue(1)
              }
            }
          ]
        },
        {
          label: i18n.t('Cluster resync interval'),
          text: i18n.t('Interval in seconds at which the collector will fully resynchronize with its peers when in cluster mode. The collector synchronizes in real-time, so this only acts as a safety net when there is a communication error between the collectors.'),
          fields: [
            {
              key: 'collector.cluster_resync_interval',
              component: pfFormInput,
              attrs: {
                type: 'number',
                step: 1
              },
              validators: {
                [i18n.t('Invalid Value.')]: minValue(1)
              }
            }
          ]
        },
        {
          label: i18n.t('Record Unmatched Parameters'),
          text: i18n.t('Should the local instance of Fingerbank record unmatched parameters so that it will be possible to submit thoses unmatched parameters to the upstream Fingerbank project for contribution.'),
          fields: [
            {
              key: 'query.record_unmatched',
              component: pfFormToggle,
              attrs: {
                values: { checked: 'enabled', unchecked: 'disabled' }
              }
            }
          ]
        },
        {
          label: i18n.t('Use proxy'),
          text: i18n.t('Should Fingerbank interact with WWW using a proxy?'),
          fields: [
            {
              key: 'proxy.use_proxy',
              component: pfFormToggle,
              attrs: {
                values: { checked: 'enabled', unchecked: 'disabled' }
              }
            }
          ]
        },
        {
          label: i18n.t('Proxy Host'),
          text: i18n.t('Host the proxy is listening on. Only the host must be specified here without any port or protocol.'),
          fields: [
            {
              key: 'proxy.host',
              component: pfFormInput,
              validators: {
                [i18n.t('Invalid Host.')]: isFQDN
              }
            }
          ]
        },
        {
          label: i18n.t('Proxy Port'),
          text: i18n.t('Port the proxy is listening on.'),
          fields: [
            {
              key: 'proxy.port',
              component: pfFormInput,
              attrs: {
                type: 'number',
                step: 1
              },
              validators: {
                [i18n.t('Invalid Port.')]: isPort
              }
            }
          ]
        },
        {
          label: i18n.t('Verify SSL'),
          text: i18n.t('Whether or not to verify SSL when using proxying.'),
          fields: [
            {
              key: 'proxy.verify_ssl',
              component: pfFormToggle,
              attrs: {
                values: { checked: 'enabled', unchecked: 'disabled' }
              }
            }
          ]
        }
      ]
    }
  ]
}

export const pfConfigurationProfilingGeneralSettingsViewDefaults = (context = {}) => {
  return {
    upstream: {
      host: 'api.fingerbank.org',
      port: 443,
      use_https: 'enabled',
      db_path: '/api/v2/download/db',
      sqlite_db_retention: 2
    },
    collector: {
      host: '127.0.0.1',
      port: 4723,
      use_https: 'enabled',
      inactive_endpoints_expiration: 168,
      query_cache_time: 1440,
      db_persistence_interval: 60,
      cluster_resync_interval: 120
    },
    proxy: {
      verify_ssl: 'enabled'
    }
  }
}

/**
 * Device Change Detection
**/
export const pfConfigurationProfilingDeviceChangeDetectionViewFields = (context = {}) => {
  return [
    {
      tab: null, // ignore tabs
      fields: [
        {
          label: i18n.t('API Key'),
          text: i18n.t('API key to interact with upstream Fingerbank project. Changing this value requires to restart the Fingerbank collector.'),
          fields: [
            {
              key: 'upstream.api_key',
              component: pfFormInput,
              validators: {
                [i18n.t('Key required.')]: required,
                [i18n.t('Invalid Key.')]: and(maxLength(255), isHex)
              }
            }
          ]
        }
      ]
    }
  ]
}

export const pfConfigurationProfilingDeviceChangeDetectionViewDefaults = (context = {}) => {
  return {}
}

export const pfConfigurationProfilingCombinationsListColumns = [
  {
    key: 'id',
    label: i18n.t('Identifier'),
    sortable: true,
    visible: true
  }
]

export const pfConfigurationProfilingCombinationsListFields = [
  {
    value: 'id',
    text: i18n.t('Identifier'),
    types: [conditionType.SUBSTRING]
  }
]

export const pfConfigurationProfilingCombinationsListConfig = (context = {}) => {
  const { $i18n } = context
  return {
    columns: pfConfigurationProfilingCombinationsListColumns,
    fields: pfConfigurationProfilingCombinationsListFields,
    rowClickRoute (item, index) {
      return { name: 'combination', params: { id: item.id } }
    },
    searchPlaceholder: $i18n.t('Search by identifier or description'),
    searchableOptions: {
      searchApiEndpoint: 'config/TODO',
      defaultSortKeys: ['id'],
      defaultSearchCondition: {
        op: 'and',
        values: [{
          op: 'or',
          values: [
            { field: 'id', op: 'contains', value: null }
          ]
        }]
      },
      defaultRoute: { name: 'profilingCombinations' }
    },
    searchableQuickCondition: (quickCondition) => {
      return {
        op: 'and',
        values: [
          {
            op: 'or',
            values: [
              { field: 'id', op: 'contains', value: quickCondition }
            ]
          }
        ]
      }
    }
  }
}

export const pfConfigurationProfilingDevicesListColumns = [
  {
    key: 'id',
    label: i18n.t('Identifier'),
    sortable: true,
    visible: true
  }
]

export const pfConfigurationProfilingDevicesListFields = [
  {
    value: 'id',
    text: i18n.t('Identifier'),
    types: [conditionType.SUBSTRING]
  }
]

export const pfConfigurationProfilingDevicesListConfig = (context = {}) => {
  const { $i18n } = context
  return {
    columns: pfConfigurationProfilingDevicesListColumns,
    fields: pfConfigurationProfilingDevicesListFields,
    rowClickRoute (item, index) {
      return { name: 'device', params: { id: item.id } }
    },
    searchPlaceholder: $i18n.t('Search by identifier or description'),
    searchableOptions: {
      searchApiEndpoint: 'config/TODO',
      defaultSortKeys: ['id'],
      defaultSearchCondition: {
        op: 'and',
        values: [{
          op: 'or',
          values: [
            { field: 'id', op: 'contains', value: null }
          ]
        }]
      },
      defaultRoute: { name: 'profilingDevices' }
    },
    searchableQuickCondition: (quickCondition) => {
      return {
        op: 'and',
        values: [
          {
            op: 'or',
            values: [
              { field: 'id', op: 'contains', value: quickCondition }
            ]
          }
        ]
      }
    }
  }
}

export const pfConfigurationProfilingDhcpFingerprintsListColumns = [
  {
    key: 'id',
    label: i18n.t('Identifier'),
    sortable: true,
    visible: true
  }
]

export const pfConfigurationProfilingDhcpFingerprintsListFields = [
  {
    value: 'id',
    text: i18n.t('Identifier'),
    types: [conditionType.SUBSTRING]
  }
]

export const pfConfigurationProfilingDhcpFingerprintsListConfig = (context = {}) => {
  const { $i18n } = context
  return {
    columns: pfConfigurationProfilingDhcpFingerprintsListColumns,
    fields: pfConfigurationProfilingDhcpFingerprintsListFields,
    rowClickRoute (item, index) {
      return { name: 'dhcpFingerprint', params: { id: item.id } }
    },
    searchPlaceholder: $i18n.t('Search by identifier or description'),
    searchableOptions: {
      searchApiEndpoint: 'config/TODO',
      defaultSortKeys: ['id'],
      defaultSearchCondition: {
        op: 'and',
        values: [{
          op: 'or',
          values: [
            { field: 'id', op: 'contains', value: null }
          ]
        }]
      },
      defaultRoute: { name: 'profilingDhcpFingerprints' }
    },
    searchableQuickCondition: (quickCondition) => {
      return {
        op: 'and',
        values: [
          {
            op: 'or',
            values: [
              { field: 'id', op: 'contains', value: quickCondition }
            ]
          }
        ]
      }
    }
  }
}

export const pfConfigurationProfilingDhcpVendorsListColumns = [
  {
    key: 'id',
    label: i18n.t('Identifier'),
    sortable: true,
    visible: true
  }
]

export const pfConfigurationProfilingDhcpVendorsListFields = [
  {
    value: 'id',
    text: i18n.t('Identifier'),
    types: [conditionType.SUBSTRING]
  }
]

export const pfConfigurationProfilingDhcpVendorsListConfig = (context = {}) => {
  const { $i18n } = context
  return {
    columns: pfConfigurationProfilingDhcpVendorsListColumns,
    fields: pfConfigurationProfilingDhcpVendorsListFields,
    rowClickRoute (item, index) {
      return { name: 'dhcpVendor', params: { id: item.id } }
    },
    searchPlaceholder: $i18n.t('Search by identifier or description'),
    searchableOptions: {
      searchApiEndpoint: 'config/TODO',
      defaultSortKeys: ['id'],
      defaultSearchCondition: {
        op: 'and',
        values: [{
          op: 'or',
          values: [
            { field: 'id', op: 'contains', value: null }
          ]
        }]
      },
      defaultRoute: { name: 'profilingDhcpVendors' }
    },
    searchableQuickCondition: (quickCondition) => {
      return {
        op: 'and',
        values: [
          {
            op: 'or',
            values: [
              { field: 'id', op: 'contains', value: quickCondition }
            ]
          }
        ]
      }
    }
  }
}

export const pfConfigurationProfilingDhcpv6FingerprintsListColumns = [
  {
    key: 'id',
    label: i18n.t('Identifier'),
    sortable: true,
    visible: true
  }
]

export const pfConfigurationProfilingDhcpv6FingerprintsListFields = [
  {
    value: 'id',
    text: i18n.t('Identifier'),
    types: [conditionType.SUBSTRING]
  }
]

export const pfConfigurationProfilingDhcpv6FingerprintsListConfig = (context = {}) => {
  const { $i18n } = context
  return {
    columns: pfConfigurationProfilingDhcpv6FingerprintsListColumns,
    fields: pfConfigurationProfilingDhcpv6FingerprintsListFields,
    rowClickRoute (item, index) {
      return { name: 'dhcpv6Fingerprint', params: { id: item.id } }
    },
    searchPlaceholder: $i18n.t('Search by identifier or description'),
    searchableOptions: {
      searchApiEndpoint: 'config/TODO',
      defaultSortKeys: ['id'],
      defaultSearchCondition: {
        op: 'and',
        values: [{
          op: 'or',
          values: [
            { field: 'id', op: 'contains', value: null }
          ]
        }]
      },
      defaultRoute: { name: 'profilingDhcpv6Fingerprints' }
    },
    searchableQuickCondition: (quickCondition) => {
      return {
        op: 'and',
        values: [
          {
            op: 'or',
            values: [
              { field: 'id', op: 'contains', value: quickCondition }
            ]
          }
        ]
      }
    }
  }
}

export const pfConfigurationProfilingDhcpv6EnterprisesListColumns = [
  {
    key: 'id',
    label: i18n.t('Identifier'),
    sortable: true,
    visible: true
  }
]

export const pfConfigurationProfilingDhcpv6EnterprisesListFields = [
  {
    value: 'id',
    text: i18n.t('Identifier'),
    types: [conditionType.SUBSTRING]
  }
]

export const pfConfigurationProfilingDhcpv6EnterprisesListConfig = (context = {}) => {
  const { $i18n } = context
  return {
    columns: pfConfigurationProfilingDhcpv6EnterprisesListColumns,
    fields: pfConfigurationProfilingDhcpv6EnterprisesListFields,
    rowClickRoute (item, index) {
      return { name: 'dhcpv6Enterprise', params: { id: item.id } }
    },
    searchPlaceholder: $i18n.t('Search by identifier or description'),
    searchableOptions: {
      searchApiEndpoint: 'config/TODO',
      defaultSortKeys: ['id'],
      defaultSearchCondition: {
        op: 'and',
        values: [{
          op: 'or',
          values: [
            { field: 'id', op: 'contains', value: null }
          ]
        }]
      },
      defaultRoute: { name: 'profilingDhcpv6Enterprises' }
    },
    searchableQuickCondition: (quickCondition) => {
      return {
        op: 'and',
        values: [
          {
            op: 'or',
            values: [
              { field: 'id', op: 'contains', value: quickCondition }
            ]
          }
        ]
      }
    }
  }
}

export const pfConfigurationProfilingMacVendorsListColumns = [
  {
    key: 'id',
    label: i18n.t('Identifier'),
    sortable: true,
    visible: true
  }
]

export const pfConfigurationProfilingMacVendorsListFields = [
  {
    value: 'id',
    text: i18n.t('Identifier'),
    types: [conditionType.SUBSTRING]
  }
]

export const pfConfigurationProfilingMacVendorsListConfig = (context = {}) => {
  const { $i18n } = context
  return {
    columns: pfConfigurationProfilingMacVendorsListColumns,
    fields: pfConfigurationProfilingMacVendorsListFields,
    rowClickRoute (item, index) {
      return { name: 'macVendor', params: { id: item.id } }
    },
    searchPlaceholder: $i18n.t('Search by identifier or description'),
    searchableOptions: {
      searchApiEndpoint: 'config/TODO',
      defaultSortKeys: ['id'],
      defaultSearchCondition: {
        op: 'and',
        values: [{
          op: 'or',
          values: [
            { field: 'id', op: 'contains', value: null }
          ]
        }]
      },
      defaultRoute: { name: 'profilingMacVendors' }
    },
    searchableQuickCondition: (quickCondition) => {
      return {
        op: 'and',
        values: [
          {
            op: 'or',
            values: [
              { field: 'id', op: 'contains', value: quickCondition }
            ]
          }
        ]
      }
    }
  }
}

export const pfConfigurationProfilingUserAgentsListColumns = [
  {
    key: 'id',
    label: i18n.t('Identifier'),
    sortable: true,
    visible: true
  }
]

export const pfConfigurationProfilingUserAgentsListFields = [
  {
    value: 'id',
    text: i18n.t('Identifier'),
    types: [conditionType.SUBSTRING]
  }
]

export const pfConfigurationProfilingUserAgentsListConfig = (context = {}) => {
  const { $i18n } = context
  return {
    columns: pfConfigurationProfilingUserAgentsListColumns,
    fields: pfConfigurationProfilingUserAgentsListFields,
    rowClickRoute (item, index) {
      return { name: 'userAgent', params: { id: item.id } }
    },
    searchPlaceholder: $i18n.t('Search by identifier or description'),
    searchableOptions: {
      searchApiEndpoint: 'config/TODO',
      defaultSortKeys: ['id'],
      defaultSearchCondition: {
        op: 'and',
        values: [{
          op: 'or',
          values: [
            { field: 'id', op: 'contains', value: null }
          ]
        }]
      },
      defaultRoute: { name: 'profilingUserAgents' }
    },
    searchableQuickCondition: (quickCondition) => {
      return {
        op: 'and',
        values: [
          {
            op: 'or',
            values: [
              { field: 'id', op: 'contains', value: quickCondition }
            ]
          }
        ]
      }
    }
  }
}

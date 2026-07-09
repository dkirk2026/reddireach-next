import React, { useCallback } from 'react'
import { Stack, Text, Box } from '@sanity/ui'
import { set, unset } from 'sanity'
import type { StringInputProps } from 'sanity'

/**
 * Custom datetime input that displays timezone information
 * Converts between local time (display) and UTC (storage)
 */
export function DateTimeWithTimezone(props: StringInputProps) {
  const { value, onChange, elementProps } = props
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Convert UTC value to local datetime-local format
  const getLocalDateTimeValue = (isoString: string | undefined) => {
    if (!isoString) return ''

    const date = new Date(isoString)
    // Get local datetime string in format: YYYY-MM-DDTHH:mm
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const localValue = event.currentTarget.value

      if (!localValue) {
        onChange(unset())
        return
      }

      // Convert local datetime to UTC ISO string
      const localDate = new Date(localValue)
      const utcIsoString = localDate.toISOString()

      onChange(set(utcIsoString))
    },
    [onChange]
  )

  return (
    <Stack space={3}>
      <input
        {...elementProps}
        type="datetime-local"
        value={getLocalDateTimeValue(value)}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '8px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      {value && (
        <Box paddingTop={2}>
          <Text size={1} muted>
            📍 Your timezone: <strong>{timezone}</strong>
            <br />
            🕒 Post will go live at: <strong>{new Date(value).toLocaleString('en-US', {
              dateStyle: 'full',
              timeStyle: 'short',
            })}</strong>
            <br />
            {new Date(value) > new Date() ? (
              <span style={{color: 'orange'}}>⏰ Scheduled for the future - won't be visible until this time</span>
            ) : (
              <span style={{color: 'green'}}>✅ Time is in the past - post will be visible after you click Publish</span>
            )}
          </Text>
        </Box>
      )}
      {!value && (
        <Box paddingTop={2}>
          <Text size={1} muted>
            📍 Your timezone: <strong>{timezone}</strong>
            <br />
            💡 Leave empty to keep as draft, or set a date/time to schedule publishing
          </Text>
        </Box>
      )}
    </Stack>
  )
}

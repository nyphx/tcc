const base = {
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 6
}

export const text = {
  textAlign: 'center',
  color: "white",
  fontWeight: "600",
  fontSize: 16
}

export const primary = {
  ...base,
  backgroundColor: "rgb(59 130 246)"
}

export const secondary = {
  ...base,
  borderWidth: 2,
  borderColor: 'rgb(220 38 38)'
}

export const secondaryText = {
  ...text,
  color: 'rgb(220 38 38)'
}
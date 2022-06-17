import { Pane } from 'tweakpane'
import { usePlsStopRerendering, useSettings } from '../lib/stores'

const Tweakpane: React.FC = (): JSX.Element => {
  const existence = usePlsStopRerendering()
  const settings = useSettings()

  if (!existence.paneExists) {
    existence.setPaneExists(true)
    const pane = new Pane({
      title: 'Settings',
      expanded: true,
    })

    pane.addInput(settings, 'shaderSpeed', { label: 'Speed', min: 0, max: 5 }).on('change', (ev) => {
      settings.setShaderSpeed(ev.value)
    })

    const resetSettings = pane.addButton({ title: 'Reset Settings' })
    resetSettings.on('click', () => {
      settings.resetToDefault()
      pane.refresh()
    })

    const saveSettings = pane.addButton({ title: 'Save Settings' })
    saveSettings.on('click', () => {
      localStorage.setItem('sceneSettings', JSON.stringify(settings))
    })
  }

  return <></>
}
export default Tweakpane

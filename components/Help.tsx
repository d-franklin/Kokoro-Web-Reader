const Help = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 px-4 py-4">
      <div className="flex flex-col gap-2">
        <div className="text-sm">Voices</div>
        <div>
          The voices are automatically cached from the server. You can refresh the cache by clicking the 'Test Server'
          button.
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm">License - GNU Affero General Public License</div>
        <div>
          <a href="https://github.com/d-franklin/Kokoro-Web-Reader" target="_blank" className="text-primary">
            https://github.com/d-franklin/Kokoro-Web-Reader
          </a>
        </div>
        <div>Kokoro Web Reader, a web browser plugin for reading a webpage with text to speech (TTS).</div>

        <div>Copyright (C) 2025 Daniel Franklin</div>
        <div>
          This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero
          General Public License as published by the Free Software Foundation, either version 3 of the License, or (at
          your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT
          ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See
          the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero
          General Public License along with this program. If not, see{' '}
          <a href="http://www.gnu.org/licenses/" target="_blank" className="text-primary">
            http://www.gnu.org/licenses/
          </a>
          .
        </div>
      </div>
    </div>
  )
}

export default Help

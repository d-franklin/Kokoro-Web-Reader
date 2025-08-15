import Link from '@/components/Link.tsx'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'

const Help = () => {
  return (
    <ScrollArea className="h-dvw px-4">
      {/* TODO: ^^^ Fix this horrible height hack */}
      <div className="flex h-full w-full flex-col gap-4 px-4 py-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm">Voices</div>
          <div>
            The voices are automatically cached from the server. You can refresh the cache by clicking the 'Test Server'
            button.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm">GitHub Repository</div>
          <div>
            <Link href="https://github.com/d-franklin/Kokoro-Web-Reader">
              https://github.com/d-franklin/Kokoro-Web-Reader
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm">Open Source</div>
          <div>Open source software that helped create this project</div>
          <ul className="list-disc pl-4">
            <li>
              WXT <Link href="https://github.com/wxt-dev/wxt">https://github.com/wxt-dev/wxt</Link>
            </li>
            <li>
              Tailwind{' '}
              <Link href="https://github.com/tailwindlabs/tailwindcss">
                https://github.com/tailwindlabs/tailwindcss
              </Link>
            </li>
            <li>
              shadcn/ui <Link href="https://github.com/shadcn-ui/ui">https://github.com/shadcn-ui/ui</Link>
            </li>
            <li>
              Omi3 <Link href="https://github.com/ouestlabs/omi3">https://github.com/ouestlabs/omi3</Link>
            </li>
            <li>
              React <Link href="https://github.com/facebook/react">https://github.com/facebook/react</Link>
            </li>
            <li>
              Kokoro-FastAPI{' '}
              <Link href="https://github.com/remsky/Kokoro-FastAPI">https://github.com/remsky/Kokoro-FastAPI</Link>
            </li>
            <li>
              Zod <Link href="https://github.com/colinhacks/zod">https://github.com/colinhacks/zod</Link>
            </li>
            <li>
              Sonner <Link href="https://github.com/emilkowalski/sonner">https://github.com/emilkowalski/sonner</Link>
            </li>
            <li>
              Lucide <Link href="https://github.com/lucide-icons/lucide">https://github.com/lucide-icons/lucide</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm">License - GNU Affero General Public License</div>
          <div>Kokoro Web Reader, a web browser plugin for reading a webpage with text to speech (TTS).</div>
          <div>Copyright (C) {new Date().getFullYear()} Daniel Franklin</div>
          <div>
            This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero
            General Public License as published by the Free Software Foundation, either version 3 of the License, or (at
            your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT
            ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See
            the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero
            General Public License along with this program. If not, see{' '}
            <Link href="http://www.gnu.org/licenses/">http://www.gnu.org/licenses/</Link>.
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default Help

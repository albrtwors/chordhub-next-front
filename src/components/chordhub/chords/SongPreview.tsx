import './SongPreview.css';

export default function SongPreview({ songStructure }: any) {
  return (
    <div className="flex-1">
      <h3 className="text-3xl font-bold">Previsualizacion</h3>
      <div className="overflow-y-scroll h-70">
        {songStructure?.parts.map((part: any, index: number) => (
          <div key={index} className="flex flex-col gap-5">
            <h3 className="text-lg font-bold">{part.type.toUpperCase()}</h3>
            {part.text.split('\n').map((p: any, index2: number) => (
              <div
                key={index2}
                className='relative'
                style={{ whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{ __html: formatChord(p) }}
              />
            ))}
          </div>
        ))}
      </div>
      <div id="songStructure"></div>
    </div>
  );
}

export const formatChord = (output: any): string => {
  let outputcontent = output;
  let newoutput = outputcontent.replace(
    /\[([A-Ga-g][#b]?((?:maj|m|dim|aug|sus[2-4]|7|9|11|13)?))\]/g,
    (match:any, chord:any) => {
      const className = chord.length >= 3 ? 'chord chord-small' : 'chord';
      return `<span class="${className}">${chord}</span>`;
    }
  );
  return newoutput;
};
import 'dotenv/config';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qhnhiumotuuoszkvzsjq.supabase.co'; // Remplace par ton URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobmhpdW1vdHV1b3N6a3Z6c2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MjIwNDEsImV4cCI6MjA1ODk5ODA0MX0.PmUGbAcIy3ZPAjp2gatUdbH6NuCljw4GYSnF1eRw0SA'; // Remplace par ta clé publique
const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadTranscript(filename, localPath) {
    try {
        const fileContent = fs.readFileSync(localPath);

        const { error } = await supabase.storage
            .from('transcripts')
            .upload(filename, fileContent, {
                contentType: 'text/html',
                upsert: true
            });

        if (error) {
            console.error('Erreur upload Supabase :', error.message);
            return null;
        }

        return `${supabaseUrl}/storage/v1/object/public/transcripts/${filename}`;
    } catch (err) {
        console.error('Erreur lecture fichier :', err.message);
        return null;
    }
}

export default uploadTranscript;

import { createClient } from '@supabase/supabase-js';
import { Fields, Files, IncomingForm } from 'formidable';
import { promises } from 'fs';

import { Role } from '../../service/type';
import { safeAPI } from './core';
import { verifyJWT } from './user/session/authing';

const form = new IncomingForm(),
  supabase = createClient(
    process.env.SUPABASE_APP_HOST!,
    process.env.SUPABASE_APP_TOKEN!,
  );
const storage = supabase.storage.from(process.env.SUPABASE_FILE_BUCKET!);

export const config = {
  api: { bodyParser: false },
};

export default safeAPI(async (request, response) => {
  const { mobilePhone } = verifyJWT(request, [Role.Reader, Role.Editor], {
    status: 403,
    statusText: 'Forbidden',
  });
  const { files } = await new Promise<{ fields: Fields; files: Files }>(
    (resolve, reject) =>
      form.parse(request, (error, fields, files) =>
        error ? reject(error) : resolve({ fields, files }),
      ),
  );
  const [{ originalFilename, filepath, mimetype }] = files.data || [];

  const publicPath = `${mobilePhone}/${originalFilename}`;

  const { error } = await storage.upload(
    publicPath,
    await promises.readFile(filepath),
    { contentType: mimetype || undefined },
  );
  if (error) throw new URIError(error.message);

  const { publicUrl } = storage.getPublicUrl(publicPath).data;

  response.send({ path: publicUrl });
});

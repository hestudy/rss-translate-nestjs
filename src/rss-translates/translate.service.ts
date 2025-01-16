import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TranslateService {
  private readonly splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 1,
  });

  private readonly model = new ChatOpenAI({
    model: process.env.OPENAI_MODEL,
    apiKey: process.env.OPENAI_APIKEY,
    configuration: {
      baseURL: process.env.OPENAI_BASEURL,
    },
  });

  private readonly logger = new Logger(TranslateService.name, {
    timestamp: true,
  });

  async splitByToken(content: string) {
    return await this.splitter.createDocuments([content]);
  }

  async translate(content: string) {
    this.logger.debug(`开始翻译:${content}`);
    const chunk = await this.splitByToken(content);
    this.logger.debug(`分割chunk:${chunk.length}`);
    const chunkRes: string[] = [];
    for await (const item of chunk) {
      this.logger.debug(`正在翻译chunk:${item.pageContent}`);
      const res = await this.model.invoke([
        new SystemMessage(
          'You are a professional translation engine, please translate the text into a colloquial, professional, elegant and fluent content, without the style of machine translation. You must only translate the text content, never interpret it.',
        ),
        new HumanMessage(`Translate into ${process.env.TRANSLATE_LANGUAGE}:
"""
${item.pageContent}
"""`),
      ]);
      this.logger.debug(`翻译完成chunk:${res.content}`);
      chunkRes.push(res.content.toString());
    }
    this.logger.debug(`翻译完成:${chunkRes.join('\n\n')}`);
    return chunkRes.join('\n\n');
  }
}

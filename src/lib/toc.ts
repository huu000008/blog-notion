import { ExtendedRecordMap, Block, PageBlock, Role } from 'notion-types';
import { getPageTableOfContents } from 'notion-utils';

export interface TocItem {
  id: string;
  text: string;
  indentLevel: number;
}

/**
 * Notion recordMap에서 목차(heading) 데이터 추출
 */
export function getToc(recordMap: ExtendedRecordMap): TocItem[] {
  // "page" 타입 블록만 추출 (타입 가드 적용)
  const pageBlockEntry = Object.values(recordMap.block).find(
    (block): block is { role: Role; value: Block } =>
      typeof block === 'object' &&
      block !== null &&
      'value' in block &&
      (block as { value?: Block }).value?.type === 'page'
  );
  if (!pageBlockEntry) return [];
  return getPageTableOfContents(pageBlockEntry.value as PageBlock, recordMap);
}

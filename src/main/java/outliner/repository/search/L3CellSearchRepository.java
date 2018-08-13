package outliner.repository.search;

import outliner.domain.L3Cell;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the L3Cell entity.
 */
public interface L3CellSearchRepository extends ElasticsearchRepository<L3Cell, Long> {
}

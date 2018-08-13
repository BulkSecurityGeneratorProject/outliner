package outliner.repository.search;

import outliner.domain.L3Row;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the L3Row entity.
 */
public interface L3RowSearchRepository extends ElasticsearchRepository<L3Row, Long> {
}

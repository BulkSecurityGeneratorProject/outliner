package outliner.repository.search;

import outliner.domain.L2;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the L2 entity.
 */
public interface L2SearchRepository extends ElasticsearchRepository<L2, Long> {
}
